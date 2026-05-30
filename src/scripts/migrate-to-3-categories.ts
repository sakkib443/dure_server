/**
 * Migration: Restructure categories into 3 root categories
 *   জামদানি  (jamdani)    — rename from জামদানি শাড়ি / jamdani-saree
 *   অলংকার   (ornaments)  — unchanged
 *   জামা      (jama)       — new root; মিমিক্রি, মেয়েদের ড্রেস, লেহেঙ্গা become its children
 *
 * Run: cd jhamdani-backend && npx ts-node src/scripts/migrate-to-3-categories.ts
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Category } from '../app/modules/category/category.model';
import { Product } from '../app/modules/product/product.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function run() {
    const uri = process.env.DATABASE_URL || '';
    if (!uri) { console.error('❌ DATABASE_URL not set'); process.exit(1); }

    console.log('🔌 Connecting...');
    await mongoose.connect(uri);
    console.log('✅ Connected\n');

    // ── 1. Rename জামদানি শাড়ি → জামদানি ─────────────────────────────────
    const jamdaniSaree = await Category.findOne({ slug: 'jamdani-saree' });
    if (!jamdaniSaree) {
        console.log('⚠️  jamdani-saree not found — skipping rename');
    } else {
        await Category.findByIdAndUpdate(jamdaniSaree._id, {
            name: 'জামদানি',
            slug: 'jamdani',
        });
        console.log('✅ Renamed জামদানি শাড়ি  →  জামদানি  (slug: jamdani)');
    }

    // ── 2. Create root জামা ─────────────────────────────────────────────────
    let jama = await Category.findOne({ slug: 'jama' });
    if (jama) {
        console.log('ℹ️  জামা (jama) already exists — skipping creation');
    } else {
        jama = await Category.create({
            name: 'জামা',
            slug: 'jama',
            description: 'আধুনিক ও ঐতিহ্যবাহী মেয়েদের পোশাক — মিমিক্রি, লেহেঙ্গা, ড্রেস।',
            icon: '👗',
            level: 0,
            parent: null,
            isActive: true,
            isFeatured: true,
            showInMenu: true,
            showInHome: true,
        });
        console.log(`✅ Created root category জামা  (slug: jama, id: ${jama._id})`);
    }

    // ── 3. Move মিমিক্রি, মেয়েদের ড্রেস, লেহেঙ্গা under জামা (level 1) ────
    const slugsToMove = ['mimicry', 'womens-dress', 'lehenga'];
    for (const slug of slugsToMove) {
        const cat = await Category.findOne({ slug });
        if (!cat) {
            console.log(`⚠️  Category "${slug}" not found — skipping`);
            continue;
        }
        await Category.findByIdAndUpdate(cat._id, {
            parent: jama._id,
            level: 1,
        });
        console.log(`✅ Moved ${cat.name}  →  child of জামা  (level 1)`);
    }

    // ── 4. Update level-1 children of the moved cats to level 2 ────────────
    // These were previously level 1 under root categories; now they are level 2
    const movedParents = await Category.find({ slug: { $in: slugsToMove } }).select('_id name');
    const movedParentIds = movedParents.map(c => c._id);

    const grandchildren = await Category.find({ parent: { $in: movedParentIds }, isDeleted: false });
    for (const gc of grandchildren) {
        await Category.findByIdAndUpdate(gc._id, { level: 2 });
        console.log(`  ↳ Updated ${gc.name}  →  level 2`);
    }

    // ── 5. Recompute productCount for every category ────────────────────────
    console.log('\n📊 Recomputing productCount...');
    const getDescendantIds = async (catId: string): Promise<string[]> => {
        const children = await Category.find({ parent: catId, isDeleted: false }).select('_id');
        let ids = children.map(c => c._id.toString());
        for (const id of [...ids]) ids = ids.concat(await getDescendantIds(id));
        return ids;
    };

    const allCats = await Category.find({ isDeleted: false }).select('_id name');
    for (const c of allCats) {
        const ids = [c._id.toString(), ...(await getDescendantIds(c._id.toString()))];
        const count = await Product.countDocuments({ category: { $in: ids }, isDeleted: false });
        await Category.findByIdAndUpdate(c._id, { productCount: count });
        if (count > 0) console.log(`  📦 ${c.name}: ${count} products`);
    }

    // ── 6. Print final tree ─────────────────────────────────────────────────
    console.log('\n🌳 Final category tree:');
    const roots = await Category.find({ parent: null, isDeleted: false }).sort({ order: 1, name: 1 });
    for (const root of roots) {
        console.log(`  [${root.slug}] ${root.name}  (${root.productCount} products)`);
        const level1 = await Category.find({ parent: root._id, isDeleted: false }).sort({ name: 1 });
        for (const l1 of level1) {
            console.log(`    ├─ [${l1.slug}] ${l1.name}  (${l1.productCount})`);
            const level2 = await Category.find({ parent: l1._id, isDeleted: false }).sort({ name: 1 });
            for (const l2 of level2) {
                console.log(`    │   └─ [${l2.slug}] ${l2.name}  (${l2.productCount})`);
            }
        }
    }

    console.log('\n🎉 Migration complete!\n');
    await mongoose.disconnect();
    process.exit(0);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
