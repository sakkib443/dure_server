import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';
import { Category } from '../app/modules/category/category.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const JAMDANI_PRODUCTS = [
    {
        name: 'ইঁন্দুবালা (Indubala)',
        description: `
            <p>Soft maroon handloom cotton saree with very detailed hand-stitched block print work on the border and achol. Ethically sourced and handcrafted by traditional weavers.</p>
            <ul>
                <li>Fabric: Premium Handloom Cotton</li>
                <li>Work: Hand-stitched Block Print</li>
                <li>Length: 6.5 Meters (with blouse piece)</li>
                <li>Occasion: Festive, Formal, Regular</li>
            </ul>
        `,
        tagline: 'Traditional Elegance in Every Thread',
        price: 2240,
        originalPrice: 2800,
        stock: 18,
        categoryName: 'Jamdani Saree',
        thumbnail: 'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365000/chutli/demo/jamdani_1.jpg',
        images: [
            'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365001/chutli/demo/jamdani_1_alt.jpg'
        ],
        colors: ['Maroon'],
        colorHex: ['#800000'],
        material: ['Handloom Cotton'],
        tags: ['jamdani', 'saree', 'traditional', 'handloom', 'maroon'],
        deliveryInfo: 'Inside Dhaka: BDT 80 (3-5 days). Outside Dhaka: BDT 150 (5-7 days).',
        careInfo: 'Hand Wash only. Natural Dry. Iron at Medium Temperature.',
        status: 'active',
        isVisible: true
    },
    {
        name: 'নীলাম্বরী (Nilambari)',
        description: `
            <p>Deep blue Dhakai Jamdani with golden zari work. A masterpiece of traditional weaving, perfect for weddings and grand celebrations.</p>
            <ul>
                <li>Fabric: Fine Silk Blend</li>
                <li>Work: Golden Zari Weaving</li>
                <li>Color: Royal Blue</li>
                <li>Finish: Soft & Lightweight</li>
            </ul>
        `,
        tagline: 'A Royal Heritage for Your Wardrobe',
        price: 4500,
        originalPrice: 5500,
        stock: 12,
        categoryName: 'Dhakai Jamdani',
        thumbnail: 'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365002/chutli/demo/jamdani_2.jpg',
        images: [
            'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365003/chutli/demo/jamdani_2_alt.jpg'
        ],
        colors: ['Blue'],
        colorHex: ['#00008B'],
        material: ['Silk Blend'],
        tags: ['dhakai', 'jamdani', 'silk', 'royal-blue', 'wedding'],
        deliveryInfo: 'Inside Dhaka: BDT 80 (3-5 days). Outside Dhaka: BDT 150 (5-7 days).',
        careInfo: 'Dry Clean recommended. Store in a cool, dry place wrapped in cotton cloth.',
        status: 'active',
        isVisible: true
    },
    {
        name: 'সাদা মেঘ (White Cloud)',
        description: `
            <p>Pristine white Jamdani with silver thread work. Simple yet sophisticated, ideal for morning events and summer festivals.</p>
        `,
        tagline: 'Pure & Sophisticated Summer Wear',
        price: 1850,
        originalPrice: 2200,
        stock: 25,
        categoryName: 'Cotton Jamdani',
        thumbnail: 'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365004/chutli/demo/jamdani_3.jpg',
        images: [],
        colors: ['White'],
        colorHex: ['#FFFFFF'],
        material: ['Pure Cotton'],
        tags: ['white', 'cotton', 'summer', 'minimalist'],
        deliveryInfo: 'Free shipping on orders above BDT 3000.',
        careInfo: 'Gentle hand wash. Do not bleach.',
        status: 'active',
        isVisible: true
    }
];

async function seed() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.DATABASE_URL || '');
        console.log('Connected!');

        for (const item of JAMDANI_PRODUCTS) {
            // Find or create category
            let category = await Category.findOne({ name: item.categoryName });
            if (!category) {
                category = await Category.create({
                    name: item.categoryName,
                    slug: item.categoryName.toLowerCase().replace(/ /g, '-'),
                    description: `${item.categoryName} collection at Chutli`
                });
                console.log(`Created category: ${category.name}`);
            }

            // Create product
            const { categoryName, ...productData } = item;
            
            // Check if product already exists to avoid duplicates
            const existing = await Product.findOne({ name: item.name });
            if (existing) {
                console.log(`Product "${item.name}" already exists, skipping...`);
                continue;
            }

            await Product.create({
                ...productData,
                category: category._id,
                priceType: 'fixed',
                productType: 'simple'
            });
            console.log(`Added product: ${item.name}`);
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
