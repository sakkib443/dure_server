import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';
import { Category } from '../app/modules/category/category.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

/**
 * Re-assign every product to the correct (sub)category based on keywords
 * found in its name. Safe to re-run any number of times.
 */

// Rule = [matcher, target category slug]. First matching rule wins.
const RULES: Array<{ test: (n: string) => boolean; slug: string }> = [
    { test: n => n.includes('লেহেঙ্গা') && n.includes('ব্রাইডাল'), slug: 'bridal-lehenga' },
    { test: n => n.includes('লেহেঙ্গা') && n.includes('পার্টি'),   slug: 'party-lehenga' },
    { test: n => n.includes('লেহেঙ্গা'),                            slug: 'bridal-lehenga' },

    { test: n => n.includes('মিমিক্রি') && n.includes('জর্জেট'),    slug: 'georgette-mimicry' },
    { test: n => n.includes('মিমিক্রি') && n.includes('সুতি'),      slug: 'suti-mimicry' },
    { test: n => n.includes('মিমিক্রি'),                            slug: 'suti-mimicry' },

    { test: n => n.includes('জামদানি') && n.includes('ঢাকাই'),      slug: 'dhakai-jamdani' },
    { test: n => n.includes('জামদানি') && (n.includes('নীল') || n.includes('রঙিন') || n.includes('রঙ') || n.includes('ফুলেল') || n.includes('লাল')), slug: 'colorful-jamdani' },
    { test: n => n.includes('জামদানি'),                            slug: 'dhakai-jamdani' },

    { test: n => n.includes('কুর্তি'),                              slug: 'kurti' },
    { test: n => n.includes('সালোয়ার') || n.includes('কামিজ') || n.includes('থ্রি-পিস') || n.includes('থ্রিপিস'), slug: 'salwar-kameez' },

    { test: n => n.includes('নেকলেস') || n.includes('গলার হার') || n.includes('হার'), slug: 'necklace' },
    { test: n => n.includes('চুড়ি') || n.includes('কানের দুল') || n.includes('দুল') || n.includes('বালা') || n.includes('কানের'), slug: 'bangles-earrings' },

    // Panjabi / anything else with মিমিক্রি falls back to the mimicry parent
    { test: n => n.includes('পাঞ্জাবি') || n.includes('পাঞ্জাবী'),  slug: 'mimicry' },
];

async function run() {
    console.log('\n🔌 Connecting...');
    await mongoose.connect(process.env.DATABASE_URL || '');
    console.log('✅ Connected\n');

    // slug → category _id
    const cats = await Category.find({ isDeleted: false });
    const bySlug: Record<string, mongoose.Types.ObjectId> = {};
    cats.forEach(c => { bySlug[c.slug] = c._id as mongoose.Types.ObjectId; });

    const products = await Product.find({ isDeleted: false });
    console.log(`Found ${products.length} products\n`);

    let moved = 0, skipped = 0;
    for (const p of products) {
        const name = p.name || '';
        const rule = RULES.find(r => r.test(name));
        if (!rule) {
            console.log(`  ⚠️  no rule: ${name}`);
            skipped++;
            continue;
        }
        const targetId = bySlug[rule.slug];
        if (!targetId) {
            console.log(`  ❌ slug not found (${rule.slug}) for: ${name}`);
            skipped++;
            continue;
        }
        if (String(p.category) === String(targetId)) {
            skipped++;
            continue; // already correct
        }
        p.category = targetId as any;
        await p.save();
        console.log(`  ✅ ${name}  →  ${rule.slug}`);
        moved++;
    }

    // Recompute denormalized productCount for every category (incl. descendants)
    const getDescendants = async (catId: string): Promise<string[]> => {
        const children = await Category.find({ parent: catId, isDeleted: false }).select('_id');
        let ids = children.map(c => c._id.toString());
        for (const id of [...ids]) ids = ids.concat(await getDescendants(id));
        return ids;
    };
    for (const c of cats) {
        const ids = [c._id.toString(), ...(await getDescendants(c._id.toString()))];
        const count = await Product.countDocuments({ category: { $in: ids }, isDeleted: false });
        await Category.findByIdAndUpdate(c._id, { productCount: count });
    }

    console.log(`\n🎉 Done. Moved ${moved}, unchanged/skipped ${skipped}.\n`);
    process.exit(0);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
