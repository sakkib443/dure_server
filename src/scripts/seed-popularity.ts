import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

/**
 * Give every product realistic popularity stats (totalSold, rating, reviewCount,
 * viewCount, likeCount) so the "popular first" sort on the products page shows a
 * meaningful order. Deterministic — safe to re-run.
 */

// A simple deterministic pseudo-random from a string (product id)
function hashNum(str: string, mod: number): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h % mod;
}

async function run() {
    console.log('\n🔌 Connecting...');
    await mongoose.connect(process.env.DATABASE_URL || '');
    console.log('✅ Connected\n');

    const products = await Product.find({ isDeleted: false });
    console.log(`Found ${products.length} products\n`);

    for (const p of products) {
        const id = String(p._id);
        const totalSold   = 15 + hashNum(id + 's', 285);     // 15 – 300
        const reviewCount = 3 + hashNum(id + 'r', 120);      // 3 – 122
        const rating      = Math.round((3.6 + (hashNum(id + 'g', 14) / 10)) * 10) / 10; // 3.6 – 5.0
        const viewCount   = 120 + hashNum(id + 'v', 4000);   // 120 – 4120
        const likeCount   = 5 + hashNum(id + 'l', 400);      // 5 – 405

        await Product.findByIdAndUpdate(p._id, {
            totalSold,
            reviewCount,
            rating: Math.min(rating, 5),
            viewCount,
            likeCount,
        });

        console.log(`  ✅ ${p.name.split(' — ')[0]}  | sold:${totalSold} ⭐${Math.min(rating,5)} (${reviewCount}) 👁${viewCount}`);
    }

    console.log('\n🎉 Popularity stats applied.\n');
    process.exit(0);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
