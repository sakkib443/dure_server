import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

/**
 * Replace broken product thumbnails with verified-working Unsplash images.
 * Matches products by a keyword in the name. Safe to re-run.
 */
const FIXES: Array<{ match: string; image: string }> = [
    // Blue Jamdani saree → woman in navy/blue saree (verified 200)
    { match: 'নীল জামদানি', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=85' },
    // White Jamdani / golden border → light off-white saree with golden buti (verified 200)
    { match: 'সফেদ জামদানি', image: 'https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?w=800&q=85' },
];

async function run() {
    console.log('\n🔌 Connecting...');
    await mongoose.connect(process.env.DATABASE_URL || '');
    console.log('✅ Connected\n');

    for (const fix of FIXES) {
        const products = await Product.find({ name: { $regex: fix.match }, isDeleted: false });
        if (products.length === 0) {
            console.log(`  ⚠️  no product matched "${fix.match}"`);
            continue;
        }
        for (const p of products) {
            p.thumbnail = fix.image;
            p.images = [fix.image];
            await p.save();
            console.log(`  ✅ ${p.name}  →  ${fix.image}`);
        }
    }

    console.log('\n🎉 Done.\n');
    process.exit(0);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
