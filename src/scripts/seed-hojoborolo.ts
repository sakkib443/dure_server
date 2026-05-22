import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';
import { Category } from '../app/modules/category/category.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const HOJOBOROLO_PRODUCTS = [
  {
    name: "Payraa (পায়রা)",
    description: "<p>Beautiful handcrafted wooden Payraa (Pigeon) doll. Hand-painted by local weavers/artisans, capturing traditional folk motifs and authentic colors.</p>",
    tagline: "Traditional Handcrafted Pigeon Figurine",
    price: 800.0,
    originalPrice: 1000.0,
    stock: 15,
    thumbnail: "https://khut.shop/bd-admin/public/storage/gallery/k6R4P6E9v1hXlbIlTHThbH2S3GA02joKA3WpUzwp.jpg",
    images: ["https://khut.shop/bd-admin/public/storage/gallery/k6R4P6E9v1hXlbIlTHThbH2S3GA02joKA3WpUzwp.jpg"],
    colors: ["Multi-color"],
    colorHex: ["#e5c158"],
    tags: ["hojoborolo", "handicraft", "folk-art", "traditional", "wood-art", "home-decor"],
    rating: 4.8,
    reviewCount: 14,
    totalSold: 28,
  },
  {
    name: "Tepa Putul (টেপা পুতুল)",
    description: "<p>Traditional clay Tepa Putul (terracotta doll) handcrafted using heritage pottery techniques. A perfect symbol of rural art and premium home decor.</p>",
    tagline: "Authentic Heritage Terracotta Art",
    price: 1800.0,
    originalPrice: 2200.0,
    stock: 10,
    thumbnail: "https://khut.shop/bd-admin/public/storage/gallery/f1Y86UeITuLpLeuZMa4kyLEMZRMxkHSA09ZT4Ndv.jpg",
    images: ["https://khut.shop/bd-admin/public/storage/gallery/f1Y86UeITuLpLeuZMa4kyLEMZRMxkHSA09ZT4Ndv.jpg"],
    colors: ["Natural Terracotta"],
    colorHex: ["#b5653b"],
    tags: ["hojoborolo", "clay-art", "tepa-putul", "traditional", "heritage", "folk-art"],
    rating: 4.9,
    reviewCount: 8,
    totalSold: 12,
  },
  {
    name: "Dim Bou (ডিম বউ)",
    description: "<p>Handcrafted wooden Dim Bou doll. Made from fine seasoned wood and painted with eco-friendly vibrant colors by traditional toy makers.</p>",
    tagline: "Classic Hand-Painted Wooden Toy",
    price: 800.0,
    originalPrice: 1000.0,
    stock: 20,
    thumbnail: "https://khut.shop/bd-admin/public/storage/gallery/9KSLJE5DjNN6QnOYHnswM4fth0tI8WZ9Hm0rxWhu.jpg",
    images: ["https://khut.shop/bd-admin/public/storage/gallery/9KSLJE5DjNN6QnOYHnswM4fth0tI8WZ9Hm0rxWhu.jpg"],
    colors: ["Multi-color"],
    colorHex: ["#e03040"],
    tags: ["hojoborolo", "handicraft", "wooden-toy", "traditional", "home-decor", "doll"],
    rating: 4.7,
    reviewCount: 19,
    totalSold: 45,
  },
  {
    name: "Pecha (পেঁচা)",
    description: "<p>Distinctively hand-carved wooden Pecha (Owl) figurine. Artistically detailed and hand-painted, symbolizing good fortune and traditional wisdom.</p>",
    tagline: "Hand-Carved Folk Owl Figurine",
    price: 800.0,
    originalPrice: 1000.0,
    stock: 18,
    thumbnail: "https://khut.shop/bd-admin/public/storage/gallery/ljOhEXfM9G6WjxQdZx0LVvMOcE5bJyxdZB7NoVUR.jpg",
    images: ["https://khut.shop/bd-admin/public/storage/gallery/ljOhEXfM9G6WjxQdZx0LVvMOcE5bJyxdZB7NoVUR.jpg"],
    colors: ["Multi-color"],
    colorHex: ["#c580d0"],
    tags: ["hojoborolo", "owl", "wooden-art", "traditional", "handicraft", "home-decor"],
    rating: 4.8,
    reviewCount: 22,
    totalSold: 37,
  },
  {
    name: "Totapakhi (তোতাপাখি)",
    description: "<p>Delightful wooden Totapakhi (Parrot) toy. Made from lightweight wood and beautifully hand-painted, reflecting authentic folk craftsmanship.</p>",
    tagline: "Eco-Friendly Traditional Wooden Parrot",
    price: 350.0,
    originalPrice: 450.0,
    stock: 0,
    thumbnail: "https://khut.shop/bd-admin/public/storage/gallery/rt1dYrl50pM0mTDrga85uXkW0ZPEYBdeCGJeILvF.jpg",
    images: ["https://khut.shop/bd-admin/public/storage/gallery/rt1dYrl50pM0mTDrga85uXkW0ZPEYBdeCGJeILvF.jpg"],
    colors: ["Green", "Yellow"],
    colorHex: ["#4ea64e", "#f3db47"],
    tags: ["hojoborolo", "wooden-bird", "parrot", "handicraft", "traditional", "toy"],
    rating: 4.6,
    reviewCount: 11,
    totalSold: 50,
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

        // 1. Get or Create the Ho-Jo-Bo-Ro-Lo category
        let category = await Category.findOne({ slug: 'hojoborolo' });
        if (!category) {
            console.log('Category "hojoborolo" not found. Creating it...');
            category = await Category.create({
                name: 'Ho-Jo-Bo-Ro-Lo',
                slug: 'hojoborolo',
                icon: '🌀',
                level: 0,
                order: 9,
                banner: 'https://khut.shop/bd-admin/public/storage/category_banners/qX3uI0I5LZxD2iqnL3Hts7sr7wAqWdSkiT06uxz8.jpg'
            });
        } else {
            console.log('Found category "hojoborolo":', category._id);
            // Update banner and count
            category.banner = 'https://khut.shop/bd-admin/public/storage/category_banners/qX3uI0I5LZxD2iqnL3Hts7sr7wAqWdSkiT06uxz8.jpg';
            category.productCount = 0; // reset count for recount
            await category.save();
        }

        // 2. Remove existing products under this category (if any) to prevent duplication
        console.log('Cleaning old products under hojoborolo...');
        await Product.deleteMany({ category: category._id });

        // 3. Seed Products
        console.log('Seeding Hojoborolo Products...');
        for (const item of HOJOBOROLO_PRODUCTS) {
            const productSlug = item.name.toLowerCase().replace(/[^a-z0-9\u0980-\u09ff]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
            const productSku = 'SKU-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();

            const discount = item.originalPrice && item.originalPrice > item.price
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

            const newProduct = await Product.create({
                ...item,
                slug: productSlug,
                sku: productSku,
                discount,
                category: category._id,
                priceType: 'fixed',
                productType: 'simple',
                status: 'active',
                visibility: 'visible',
                isDeleted: false,
            });

            // Increment Category's productCount
            await Category.findByIdAndUpdate(category._id, { $inc: { productCount: 1 } });
            
            console.log(`  Added Product: ${newProduct.name} under Category: ${category.name}`);
        }

        console.log('\nSeeding hojoborolo products completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
