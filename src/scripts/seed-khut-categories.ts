import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';
import { Category } from '../app/modules/category/category.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const CATEGORIES_TREE = [
    // Level 0 Root Categories
    { name: 'New Arrivals', slug: 'new-arrivals', icon: '✨', level: 0, order: 1 },
    { name: 'Women', slug: 'women', icon: '👗', level: 0, order: 2 },
    { name: 'Men', slug: 'men', icon: '👔', level: 0, order: 3 },
    { name: 'Kids', slug: 'kids', icon: '🧸', level: 0, order: 4 },
    { name: 'Home Decor', slug: 'home-decor', icon: '🏺', level: 0, order: 5 },
    { name: 'Patchwork', slug: 'patchwork', icon: '🪡', level: 0, order: 6 },
    { name: 'Jewellery', slug: 'jewellery', icon: '💍', level: 0, order: 7 },
    { name: 'Gifts & Crafts', slug: 'gifts-crafts', icon: '🎁', level: 0, order: 8 },
    { name: 'Ho-Jo-Bo-Ro-Lo', slug: 'hojoborolo', icon: '🌀', level: 0, order: 9 },
];

const WOMEN_SUBCATEGORIES = [
    { name: 'Saree', slug: 'saree', parentSlug: 'women', level: 1, order: 1 },
    { name: 'Skirt', slug: 'skirt', parentSlug: 'women', level: 1, order: 2 },
    { name: 'Top', slug: 'top', parentSlug: 'women', level: 1, order: 3 },
    { name: 'Pant', slug: 'pant', parentSlug: 'women', level: 1, order: 4 },
    { name: 'Blouse', slug: 'blouse', parentSlug: 'women', level: 1, order: 5 },
];

const SAREE_CHILDCATEGORIES = [
    { name: 'Cotton', slug: 'cotton-saree', parentSlug: 'saree', level: 2, order: 1 },
    { name: 'Endi-Silk', slug: 'endi-silk-saree', parentSlug: 'saree', level: 2, order: 2 },
    { name: 'Half-Silk', slug: 'half-silk-saree', parentSlug: 'saree', level: 2, order: 3 },
    { name: 'Endi-Cotton', slug: 'endi-cotton-saree', parentSlug: 'saree', level: 2, order: 4 },
    { name: 'Mercerized cotton', slug: 'mercerized-cotton-saree', parentSlug: 'saree', level: 2, order: 5 },
];

const SKIRT_CHILDCATEGORIES = [
    { name: 'Cotton', slug: 'cotton-skirt', parentSlug: 'skirt', level: 2, order: 1 },
];

const TOP_CHILDCATEGORIES = [
    { name: 'Cotton', slug: 'cotton-top', parentSlug: 'top', level: 2, order: 1 },
    { name: 'Endi- cotton', slug: 'endi-cotton-top', parentSlug: 'top', level: 2, order: 2 },
    { name: 'Endi-silk', slug: 'endi-silk-top', parentSlug: 'top', level: 2, order: 3 },
    { name: 'Half-silk', slug: 'half-silk-top', parentSlug: 'top', level: 2, order: 4 },
];

const PANT_CHILDCATEGORIES = [
    { name: 'Cotton', slug: 'cotton-pant', parentSlug: 'pant', level: 2, order: 1 },
];

const BLOUSE_CHILDCATEGORIES = [
    { name: 'Cotton', slug: 'cotton-blouse', parentSlug: 'blouse', level: 2, order: 1 },
    { name: 'Endi- cotton', slug: 'endi-cotton-blouse', parentSlug: 'blouse', level: 2, order: 2 },
    { name: 'Endi-silk', slug: 'endi-silk-blouse', parentSlug: 'blouse', level: 2, order: 3 },
    { name: 'Half-silk', slug: 'half-silk-blouse', parentSlug: 'blouse', level: 2, order: 4 },
];

const JAMDANI_PRODUCTS = [
    // Sarees
    {
        name: 'Indubala (ইন্দুবালা)',
        description: '<p>Soft maroon handloom cotton saree with very detailed hand-stitched block print work on the border and achol. Ethically sourced and handcrafted by traditional weavers.</p>',
        tagline: 'Traditional Elegance in Every Thread',
        price: 2240,
        originalPrice: 2800,
        stock: 18,
        categorySlug: 'cotton-saree',
        thumbnail: 'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365000/chutli/demo/jamdani_1.jpg',
        images: ['https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365001/chutli/demo/jamdani_1_alt.jpg'],
        colors: ['Maroon'],
        colorHex: ['#800000'],
        tags: ['jamdani', 'saree', 'traditional', 'cotton', 'maroon'],
        rating: 4.8,
        reviewCount: 24,
        totalSold: 45,
    },
    {
        name: 'Oindrila (ঐন্দ্রিলা)',
        description: '<p>Beautiful royal blue Endi-Silk saree with golden zari work. Perfectly finished with soft texture and classic embroidery border.</p>',
        tagline: 'Zari Weaving Masterpiece',
        price: 5600,
        originalPrice: 7000,
        stock: 12,
        categorySlug: 'endi-silk-saree',
        thumbnail: 'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365002/chutli/demo/jamdani_2.jpg',
        images: ['https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365003/chutli/demo/jamdani_2_alt.jpg'],
        colors: ['Blue'],
        colorHex: ['#0000ff'],
        tags: ['jamdani', 'saree', 'silk', 'blue', 'zari'],
        rating: 4.9,
        reviewCount: 15,
        totalSold: 32,
    },
    {
        name: 'Kolabou (কলাবৌ)',
        description: '<p>Half-silk white Jamdani with silver thread borders. Elegant, lightweight, and ideal for summer festivals.</p>',
        tagline: 'Pure & Sophisticated Summer Wear',
        price: 2640,
        originalPrice: 3200,
        stock: 15,
        categorySlug: 'half-silk-saree',
        thumbnail: 'https://res.cloudinary.com/dhp32ntlu/image/upload/v1716365004/chutli/demo/jamdani_3.jpg',
        images: [],
        colors: ['White'],
        colorHex: ['#ffffff'],
        tags: ['jamdani', 'saree', 'half-silk', 'white', 'summer'],
        rating: 4.7,
        reviewCount: 18,
        totalSold: 50,
    },
    {
        name: 'Maloti (মালতি)',
        description: '<p>Endi-cotton handloom saree in soft olive green with mustard border work. Highly breathable fabric for everyday comfort.</p>',
        tagline: 'Comfort and Heritage Combined',
        price: 2100,
        originalPrice: 2500,
        stock: 20,
        categorySlug: 'endi-cotton-saree',
        thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
        images: [],
        colors: ['Olive Green'],
        colorHex: ['#556b2f'],
        tags: ['jamdani', 'saree', 'endi-cotton', 'green'],
        rating: 4.6,
        reviewCount: 12,
        totalSold: 28,
    },
    {
        name: 'Nilambari (নীলাম্বরী)',
        description: '<p>Mercerized cotton saree with rich golden thread details and a midnight blue texture. Drapes beautifully and remains crisp.</p>',
        tagline: 'Royal Blue Mercerized Magic',
        price: 3400,
        originalPrice: 4000,
        stock: 14,
        categorySlug: 'mercerized-cotton-saree',
        thumbnail: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
        images: [],
        colors: ['Midnight Blue'],
        colorHex: ['#191970'],
        tags: ['jamdani', 'saree', 'mercerized', 'blue'],
        rating: 4.9,
        reviewCount: 30,
        totalSold: 65,
    },

    // Skirts
    {
        name: 'Banalata Cotton Skirt (বনলতা)',
        description: '<p>Traditional printed cotton long skirt with detailed borders and drawstring waist. Flowy, stylish, and perfect for hot weather.</p>',
        tagline: 'Bohemian Vibes, Traditional Prints',
        price: 1550,
        originalPrice: 1950,
        stock: 25,
        categorySlug: 'cotton-skirt',
        thumbnail: 'https://images.unsplash.com/photo-1583496661160-fb488b2c1a82?w=600&q=80',
        images: [],
        colors: ['Red', 'Black'],
        colorHex: ['#ff0000', '#000000'],
        tags: ['skirt', 'cotton', 'women', 'printed'],
        rating: 4.5,
        reviewCount: 9,
        totalSold: 14,
    },

    // Tops
    {
        name: 'Chirantan Cotton Top (চিরন্তন)',
        description: '<p>Short cotton top with ikat prints and mandarin collar. Super comfortable for office or college wear.</p>',
        tagline: 'Casual Comfort Redefined',
        price: 1200,
        originalPrice: 1500,
        stock: 30,
        categorySlug: 'cotton-top',
        thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
        images: [],
        colors: ['Grey', 'Pink'],
        colorHex: ['#808080', '#ffc0cb'],
        tags: ['top', 'cotton', 'casual', 'tunic'],
        rating: 4.4,
        reviewCount: 16,
        totalSold: 42,
    },
    {
        name: 'Suranjana Endi Cotton Top (সুরঞ্জনা)',
        description: '<p>Flowy A-line top made of Endi cotton blend with detailed hand-embroidery on the yoke.</p>',
        tagline: 'Handcrafted Elegance',
        price: 1850,
        originalPrice: 2200,
        stock: 18,
        categorySlug: 'endi-cotton-top',
        thumbnail: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&q=80',
        images: [],
        colors: ['Mustard Yellow'],
        colorHex: ['#ffdb58'],
        tags: ['top', 'endi-cotton', 'embroidered', 'yellow'],
        rating: 4.7,
        reviewCount: 11,
        totalSold: 19,
    },

    // Pants
    {
        name: 'Kashish Dhoti Pant (কাশীশ)',
        description: '<p>Pre-stitched cotton dhoti style pants with elastic waist. Easy-to-style traditional bottom wear.</p>',
        tagline: 'Smart Fusion Pants',
        price: 950,
        originalPrice: 1200,
        stock: 40,
        categorySlug: 'cotton-pant',
        thumbnail: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&q=80',
        images: [],
        colors: ['White', 'Black'],
        colorHex: ['#ffffff', '#000000'],
        tags: ['pant', 'dhoti', 'cotton', 'bottoms'],
        rating: 4.3,
        reviewCount: 22,
        totalSold: 88,
    },

    // Blouses
    {
        name: 'Shayma designer Blouse (শ্যামা)',
        description: '<p>Cotton padded blouse with block print patterns, elbow-length sleeves and stylish back tie.</p>',
        tagline: 'Compliment Your Favorite Saree',
        price: 1150,
        originalPrice: 1400,
        stock: 15,
        categorySlug: 'cotton-blouse',
        thumbnail: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&q=80',
        images: [],
        colors: ['Black', 'Gold'],
        colorHex: ['#000000', '#ffd700'],
        tags: ['blouse', 'cotton', 'block-print', 'designer'],
        rating: 4.8,
        reviewCount: 14,
        totalSold: 35,
    }
];

async function seed() {
    try {
        console.log('Connecting to database...');
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL env variable not defined!');
        }
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected successfully!');

        // 1. Wipe out existing products and categories
        console.log('Clearing old products and categories...');
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('Database cleared!');

        // 2. Create Root Categories
        const createdCategoriesMap: Record<string, any> = {};
        console.log('Seeding Root Categories...');
        for (const cat of CATEGORIES_TREE) {
            const newCat = await Category.create({
                name: cat.name,
                slug: cat.slug,
                icon: cat.icon,
                level: cat.level,
                order: cat.order,
                banner: cat.slug === 'women' ? 'https://khut.shop/bd-admin/public/storage/category_banners/qvOazgGRriLOZCTy64j2sYjiLTwxJDqVEXAhpUHh.jpg' : ''
            });
            createdCategoriesMap[cat.slug] = newCat;
            console.log(`  Added Root Category: ${newCat.name}`);
        }

        // 3. Create Women Subcategories
        console.log('Seeding Women Subcategories...');
        for (const sub of WOMEN_SUBCATEGORIES) {
            const parent = createdCategoriesMap[sub.parentSlug];
            if (!parent) continue;
            const newSub = await Category.create({
                name: sub.name,
                slug: sub.slug,
                level: sub.level,
                order: sub.order,
                parent: parent._id
            });
            createdCategoriesMap[sub.slug] = newSub;
            console.log(`  Added Subcategory: ${newSub.name} -> Parent: ${parent.name}`);
        }

        // 4. Create Childcategories
        const allChildCategories = [
            ...SAREE_CHILDCATEGORIES,
            ...SKIRT_CHILDCATEGORIES,
            ...TOP_CHILDCATEGORIES,
            ...PANT_CHILDCATEGORIES,
            ...BLOUSE_CHILDCATEGORIES,
        ];

        console.log('Seeding Childcategories...');
        for (const child of allChildCategories) {
            const parent = createdCategoriesMap[child.parentSlug];
            if (!parent) continue;
            const newChild = await Category.create({
                name: child.name,
                slug: child.slug,
                level: child.level,
                order: child.order,
                parent: parent._id
            });
            createdCategoriesMap[child.slug] = newChild;
            console.log(`  Added Childcategory: ${newChild.name} -> Parent: ${parent.name}`);
        }

        // 5. Seed Products
        console.log('Seeding Products...');
        for (const item of JAMDANI_PRODUCTS) {
            const category = createdCategoriesMap[item.categorySlug];
            if (!category) {
                console.log(`  Category slug "${item.categorySlug}" not found! Skipping product ${item.name}`);
                continue;
            }

            const { categorySlug, ...productData } = item;
            const productSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
            const productSku = 'SKU-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();

            const discount = item.originalPrice && item.originalPrice > item.price
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

            const newProduct = await Product.create({
                ...productData,
                slug: productSlug,
                sku: productSku,
                discount,
                category: category._id,
                priceType: 'fixed',
                productType: 'simple',
                status: 'active',
                visibility: 'visible',
                isDeleted: false,
                likeCount: Math.floor(Math.random() * 50),
                commentCount: item.reviewCount,
                shareCount: Math.floor(Math.random() * 30),
                viewCount: Math.floor(Math.random() * 500) + 100,
            });

            // Increment Category's productCount
            await Category.findByIdAndUpdate(category._id, { $inc: { productCount: 1 } });
            
            // Also increment subcategory parent's productCount recursively
            if (category.parent) {
                await Category.findByIdAndUpdate(category.parent, { $inc: { productCount: 1 } });
                const parentCat = await Category.findById(category.parent);
                if (parentCat && parentCat.parent) {
                    await Category.findByIdAndUpdate(parentCat.parent, { $inc: { productCount: 1 } });
                }
            }

            console.log(`  Added Product: ${newProduct.name} under Category: ${category.name}`);
        }

        console.log('\nSeeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
