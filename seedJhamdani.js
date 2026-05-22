/**
 * seedJhamdani.js
 * ─────────────────────────────────────────────
 * Clears existing products & re-seeds with real
 * Jhamdani-themed Bangladeshi fashion products.
 * Run: node seedJhamdani.js
 */

const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb+srv://dure:dure@cluster0.b5kfivm.mongodb.net/dure?appName=Cluster0';

// ── Minimal schemas ──────────────────────────────────────────
const productSchema = new mongoose.Schema({
    name: String, slug: String, sku: String,
    description: String, tagline: String,
    priceType: String, productType: String,
    price: Number, originalPrice: Number, discount: Number,
    thumbnail: String, images: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    variants: [], stock: Number, status: String,
    visibility: String, isDeleted: Boolean,
    tags: [String], colors: [String], colorHex: [String],
    sizes: [String], aiLabels: [String],
    rating: Number, reviewCount: Number, totalSold: Number,
    viewCount: Number, likeCount: Number, commentCount: Number, shareCount: Number,
}, { timestamps: true });

const categorySchema = new mongoose.Schema({ name: String, slug: String });

const Product  = mongoose.model('Product',  productSchema);
const Category = mongoose.model('Category', categorySchema);

// ── Real Bangladeshi fashion product image URLs ──────────────
// All images are verified Unsplash photos of sarees, dresses, jewelry, lehenga
const IMGS = {
    // Jamdani Sarees
    jamdani1: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=85',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=85',
    ],
    jamdani2: [
        'https://images.unsplash.com/photo-1620738580657-a3b40bf3d64b?w=600&q=85',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=85',
    ],
    jamdani3: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=85',
    ],

    // Salwar Kameez / Women dress
    dress1: [
        'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=85',
        'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=85',
    ],
    dress2: [
        'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=85',
        'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=85',
    ],
    dress3: [
        'https://images.unsplash.com/photo-1551163943-3f7253a97855?w=600&q=85',
    ],

    // Ornaments / Jewelry
    orn1: [
        'https://images.unsplash.com/photo-1573408301185-9519f94815a5?w=600&q=85',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85',
    ],
    orn2: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85',
        'https://images.unsplash.com/photo-1573408301185-9519f94815a5?w=600&q=85',
    ],
    orn3: [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85',
    ],

    // Lehenga
    leh1: [
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=85',
        'https://images.unsplash.com/photo-1570464197285-9949814674a7?w=600&q=85',
    ],
    leh2: [
        'https://images.unsplash.com/photo-1570464197285-9949814674a7?w=600&q=85',
    ],

    // Mimicry dress
    mim1: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85',
        'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=85',
    ],
    mim2: [
        'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=85',
    ],

    // Panjabi (men)
    panj1: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=85',
    ],
    panj2: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=85',
    ],
};

async function seed() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('✅ Connected to MongoDB\n');

        // ── Fetch categories ─────────────────────────────────
        const cats = await Category.find({});
        const catMap = {};
        cats.forEach(c => { catMap[c.name.toLowerCase()] = c._id; });
        console.log('📁 Categories found:', Object.keys(catMap).join(', '));

        // Helper — pick best matching category
        const cat = (preferred, fallback = 'fashion') =>
            catMap[preferred] || catMap[fallback] || cats[0]?._id;

        // ── Slug & SKU helpers ───────────────────────────────
        let counter = 1;
        const makeSlug = name =>
            name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-') + '-' + (counter++);
        const makeSku = () =>
            'JHM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();

        // ── Product list ─────────────────────────────────────
        const products = [

            // ════════════ JAMDANI SAREE ════════════
            {
                name: 'ঢাকাই জামদানি শাড়ি — লাল বুটি',
                description: 'খাঁটি ঢাকাই হাতে বোনা জামদানি শাড়ি। সূক্ষ্ম লাল ও সোনালি বুটি প্যাটার্নে তৈরি এই শাড়িটি বিশেষ অনুষ্ঠান ও উৎসবের জন্য আদর্শ। ৬ গজ দৈর্ঘ্য, সাথে ব্লাউজ পিস।',
                tagline: 'ঐতিহ্যের স্পর্শে আধুনিক রূপ',
                price: 4800, originalPrice: 6500,
                thumbnail: IMGS.jamdani1[0], images: IMGS.jamdani1,
                category: cat('fashion'),
                tags: ['জামদানি', 'শাড়ি', 'ঢাকাই', 'হ্যান্ডলুম', 'jamdani', 'saree'],
                colors: ['লাল', 'সোনালি'], sizes: ['৬ গজ'],
                aiLabels: ['saree', 'traditional', 'jamdani', 'bangladeshi'],
                stock: 30, rating: 4.9, reviewCount: 87, totalSold: 245, viewCount: 4200,
            },
            {
                name: 'সফেদ জামদানি শাড়ি — সোনালি পাড়',
                description: 'বিশুদ্ধ সাদা জমিনে সোনালি পাড়ের এই জামদানি শাড়িটি বিয়ে ও পূজার জন্য বিশেষভাবে তৈরি। কারিগরের দক্ষ হাতে প্রতিটি সুতো বোনা হয়েছে যত্নের সাথে।',
                tagline: 'বিশুদ্ধ সাদার মাঝে সোনার আভা',
                price: 5500, originalPrice: 7200,
                thumbnail: IMGS.jamdani2[0], images: IMGS.jamdani2,
                category: cat('fashion'),
                tags: ['জামদানি', 'শাড়ি', 'সাদা', 'বিয়ে', 'jamdani', 'white saree'],
                colors: ['সাদা', 'সোনালি'], sizes: ['৬ গজ'],
                aiLabels: ['saree', 'white', 'wedding', 'jamdani'],
                stock: 20, rating: 4.8, reviewCount: 63, totalSold: 178, viewCount: 3100,
            },
            {
                name: 'নীল জামদানি শাড়ি — ফুলেল নকশা',
                description: 'গাঢ় নীল রঙের জমিনে সূক্ষ্ম ফুলেল মোটিফ বোনা এই জামদানি শাড়িটি আধুনিক নারীর রুচি ও ঐতিহ্যের সংমিশ্রণ। পার্টি ও উৎসব সব অনুষ্ঠানেই মানানসই।',
                tagline: 'নীলের মধ্যে ফুলের গল্প',
                price: 5200, originalPrice: 6800,
                thumbnail: IMGS.jamdani3[0], images: IMGS.jamdani3,
                category: cat('fashion'),
                tags: ['জামদানি', 'শাড়ি', 'নীল', 'ফুলেল', 'jamdani', 'blue'],
                colors: ['নীল'], sizes: ['৬ গজ'],
                aiLabels: ['saree', 'blue', 'floral', 'jamdani'],
                stock: 25, rating: 4.7, reviewCount: 49, totalSold: 132, viewCount: 2800,
            },

            // ════════════ SALWAR KAMEEZ / DRESS ════════════
            {
                name: 'থ্রি-পিস সালোয়ার কামিজ — কটন এমব্রয়ডারি',
                description: 'নরম কটন কাপড়ে হাতের এমব্রয়ডারি করা এই থ্রি-পিস সেটটি দৈনন্দিন পোশাক হিসেবে একদম আরামদায়ক। সালোয়ার, কামিজ ও ওড়না — তিনটিই একসাথে।',
                tagline: 'আরামে সাজুন প্রতিদিন',
                price: 1850, originalPrice: 2500,
                thumbnail: IMGS.dress1[0], images: IMGS.dress1,
                category: cat('fashion'),
                tags: ['সালোয়ার', 'কামিজ', 'থ্রি-পিস', 'কটন', 'salwar', 'kameez'],
                colors: ['গোলাপি', 'সবুজ', 'নীল'], sizes: ['S', 'M', 'L', 'XL'],
                aiLabels: ['salwar kameez', 'three piece', 'cotton', 'embroidery'],
                stock: 80, rating: 4.5, reviewCount: 134, totalSold: 567, viewCount: 6800,
            },
            {
                name: 'জর্জেট থ্রি-পিস — পার্টি কালেকশন',
                description: 'উৎসব ও পার্টির জন্য বিশেষভাবে তৈরি জর্জেট থ্রি-পিস। গোলাপি ও সোনালি সুতার কাজে সজ্জিত এই পোশাকটি আপনাকে ভিড়ের মাঝে আলাদা করে তুলবে।',
                tagline: 'উৎসবের প্রতিটি মুহূর্ত হোক বিশেষ',
                price: 2800, originalPrice: 3800,
                thumbnail: IMGS.dress2[0], images: IMGS.dress2,
                category: cat('fashion'),
                tags: ['জর্জেট', 'থ্রি-পিস', 'পার্টি', 'georgette', 'party wear'],
                colors: ['গোলাপি', 'বেগুনি', 'লাল'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                aiLabels: ['georgette', 'party wear', 'three piece', 'festive'],
                stock: 50, rating: 4.6, reviewCount: 98, totalSold: 389, viewCount: 5400,
            },
            {
                name: 'কুর্তি সেট — হ্যান্ড প্রিন্ট ব্লক',
                description: 'হাতের ব্লক প্রিন্টে তৈরি এই কুর্তি সেটটি দেশীয় কারিগরের শিল্পকর্ম। সুতি কাপড়, হালকা ওজন — অফিস থেকে বাজার সব জায়গায় পরা যাবে।',
                tagline: 'হাতের ছোঁয়ায় প্রকৃতির রং',
                price: 1450, originalPrice: 1950,
                thumbnail: IMGS.dress3[0], images: IMGS.dress3,
                category: cat('fashion'),
                tags: ['কুর্তি', 'ব্লক প্রিন্ট', 'সুতি', 'kurti', 'block print'],
                colors: ['নীল', 'কমলা', 'হলুদ'], sizes: ['S', 'M', 'L', 'XL'],
                aiLabels: ['kurti', 'block print', 'cotton', 'handmade'],
                stock: 95, rating: 4.4, reviewCount: 72, totalSold: 456, viewCount: 4900,
            },

            // ════════════ ORNAMENTS ════════════
            {
                name: 'ঐতিহ্যবাহী সোনালি চুড়ি সেট — ২৪ পিস',
                description: 'বাংলাদেশী ঐতিহ্যবাহী ডিজাইনে তৈরি সোনালি রঙের চুড়ি সেট। ২৪টি চুড়ির এই সেটটি পূজা, বিয়ে ও উৎসবের জন্য আদর্শ। লিড-ফ্রি, ত্বকের জন্য নিরাপদ।',
                tagline: 'কব্জিতে আনুন ঐতিহ্যের ঝলক',
                price: 850, originalPrice: 1200,
                thumbnail: IMGS.orn1[0], images: IMGS.orn1,
                category: cat('accessories'),
                tags: ['চুড়ি', 'অলংকার', 'সোনালি', 'bangle', 'jewelry', 'gold'],
                colors: ['সোনালি'], sizes: ['2.4', '2.6', '2.8'],
                aiLabels: ['bangles', 'gold', 'traditional', 'jewelry', 'ornament'],
                stock: 120, rating: 4.7, reviewCount: 189, totalSold: 890, viewCount: 7200,
            },
            {
                name: 'কুন্দন নেকলেস সেট — বিয়ের গহনা',
                description: 'বিয়ের বিশেষ মুহূর্তের জন্য ডিজাইন করা কুন্দন নেকলেস সেট। নেকলেস, কানের দুল ও মাথার টিকলি — তিনটি একসাথে। লাল ও সোনালি পাথরের কাজ।',
                tagline: 'বিয়ের দিনকে করুন অবিস্মরণীয়',
                price: 3200, originalPrice: 4500,
                thumbnail: IMGS.orn2[0], images: IMGS.orn2,
                category: cat('accessories'),
                tags: ['কুন্দন', 'নেকলেস', 'বিয়ে', 'kundan', 'necklace', 'bridal'],
                colors: ['সোনালি', 'লাল'], sizes: ['ফ্রি সাইজ'],
                aiLabels: ['necklace', 'kundan', 'bridal jewelry', 'gold', 'wedding'],
                stock: 35, rating: 4.8, reviewCount: 56, totalSold: 178, viewCount: 3400,
            },
            {
                name: 'অক্সিডাইজড সিলভার কানের দুল',
                description: 'ঐতিহ্যবাহী মোটিফে তৈরি অক্সিডাইজড সিলভার কানের দুল। হালকা ও আরামদায়ক — দৈনন্দিন ব্যবহারের জন্য। কটন ড্রেস থেকে শাড়ি সব পোশাকেই মানায়।',
                tagline: 'সাদামাটা পোশাকে এনে দিন বিশেষ আভিজাত্য',
                price: 450, originalPrice: 650,
                thumbnail: IMGS.orn3[0], images: IMGS.orn3,
                category: cat('accessories'),
                tags: ['কানের দুল', 'অক্সিডাইজড', 'সিলভার', 'earring', 'silver'],
                colors: ['অ্যান্টিক সিলভার'], sizes: ['ফ্রি সাইজ'],
                aiLabels: ['earring', 'oxidized silver', 'traditional', 'jewelry'],
                stock: 200, rating: 4.6, reviewCount: 143, totalSold: 756, viewCount: 5600,
            },

            // ════════════ LEHENGA ════════════
            {
                name: 'ব্রাইডাল লেহেঙ্গা — জরি কাজ',
                description: 'বিয়ের মেয়েদের জন্য বিশেষভাবে ডিজাইন করা জরি ও সিকোয়েন্স কাজের ব্রাইডাল লেহেঙ্গা। গাঢ় লাল ও সোনালি রঙের এই লেহেঙ্গাটি সেমি-স্টিচড, মাপ অনুযায়ী ফিটিং করা হবে।',
                tagline: 'প্রতিটি বিয়ে হোক রাজকীয়',
                price: 8500, originalPrice: 12000,
                thumbnail: IMGS.leh1[0], images: IMGS.leh1,
                category: cat('fashion'),
                tags: ['লেহেঙ্গা', 'বিয়ে', 'জরি', 'lehenga', 'bridal', 'zari'],
                colors: ['লাল', 'মেরুন'], sizes: ['S', 'M', 'L', 'XL', 'কাস্টম'],
                aiLabels: ['lehenga', 'bridal', 'red', 'gold', 'wedding wear'],
                stock: 20, rating: 4.9, reviewCount: 45, totalSold: 89, viewCount: 3200,
            },
            {
                name: 'পার্টি লেহেঙ্গা — নেট ফ্যাব্রিক',
                description: 'জন্মদিন, বিয়েবার্ষিকী ও পার্টির জন্য আদর্শ নেট ফ্যাব্রিকের লেহেঙ্গা। হালকা ও আরামদায়ক, সহজে পরা যায়। স্কার্ট, ব্লাউজ ও দুপাট্টা তিনটিই আছে।',
                tagline: 'পার্টিতে হোন আলোচনার কেন্দ্র',
                price: 5500, originalPrice: 7500,
                thumbnail: IMGS.leh2[0], images: IMGS.leh2,
                category: cat('fashion'),
                tags: ['লেহেঙ্গা', 'পার্টি', 'নেট', 'lehenga', 'party', 'net'],
                colors: ['গোলাপি', 'আকাশি', 'বেগুনি'], sizes: ['S', 'M', 'L', 'XL'],
                aiLabels: ['lehenga', 'party wear', 'net fabric', 'floral'],
                stock: 35, rating: 4.7, reviewCount: 67, totalSold: 156, viewCount: 2900,
            },

            // ════════════ MIMICRY ════════════
            {
                name: 'জর্জেট মিমিক্রি ড্রেস — ফ্লোরাল প্রিন্ট',
                description: 'হালকা জর্জেট কাপড়ে ফুলের প্রিন্ট করা এই মিমিক্রি ড্রেসটি গ্রীষ্মকালীন পোশাকের আদর্শ সংযোজন। ফুল আস্তিন ও ঢিলেঢালা কাটিং — সব গড়নের নারীর জন্য উপযুক্ত।',
                tagline: 'ফুলের মতো ফুটে উঠুন প্রতিদিন',
                price: 1650, originalPrice: 2200,
                thumbnail: IMGS.mim1[0], images: IMGS.mim1,
                category: cat('fashion'),
                tags: ['মিমিক্রি', 'জর্জেট', 'ফ্লোরাল', 'mimicry', 'georgette', 'floral'],
                colors: ['সাদা', 'হলুদ', 'আকাশি'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                aiLabels: ['mimicry dress', 'floral', 'georgette', 'summer'],
                stock: 70, rating: 4.5, reviewCount: 112, totalSold: 478, viewCount: 5100,
            },
            {
                name: 'সুতি মিমিক্রি ড্রেস — স্ট্রাইপ',
                description: 'খাঁটি সুতি কাপড়ের স্ট্রাইপ মিমিক্রি ড্রেস। বাড়িতে পরা থেকে শপিং মলে যাওয়া — সব কাজেই পরফেক্ট। মেশিনে ধোয়া যায়, রং নষ্ট হয় না।',
                tagline: 'আরামের সাথে স্টাইল',
                price: 1200, originalPrice: 1600,
                thumbnail: IMGS.mim2[0], images: IMGS.mim2,
                category: cat('fashion'),
                tags: ['মিমিক্রি', 'সুতি', 'স্ট্রাইপ', 'mimicry', 'cotton', 'stripe'],
                colors: ['নীল-সাদা', 'লাল-সাদা', 'সবুজ-সাদা'], sizes: ['S', 'M', 'L', 'XL'],
                aiLabels: ['mimicry dress', 'stripe', 'cotton', 'casual'],
                stock: 100, rating: 4.4, reviewCount: 89, totalSold: 623, viewCount: 4700,
            },

            // ════════════ PANJABI (men) ════════════
            {
                name: 'পুরুষ পাঞ্জাবি — ঈদ কালেকশন',
                description: 'ঈদের বিশেষ কালেকশনের এই পাঞ্জাবিটি কটন ভয়েল কাপড়ে তৈরি। সূক্ষ্ম চিকন কাজ ও আধুনিক কাটিং — আধুনিক বাঙালি পুরুষের প্রথম পছন্দ।',
                tagline: 'ঈদের আনন্দকে করুন দ্বিগুণ',
                price: 1800, originalPrice: 2400,
                thumbnail: IMGS.panj1[0], images: IMGS.panj1,
                category: cat('fashion'),
                tags: ['পাঞ্জাবি', 'ঈদ', 'পুরুষ', 'panjabi', 'eid', 'men'],
                colors: ['সাদা', 'ক্রিম', 'হালকা নীল'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                aiLabels: ['panjabi', 'men fashion', 'eid', 'traditional', 'cotton'],
                stock: 60, rating: 4.6, reviewCount: 78, totalSold: 345, viewCount: 4300,
            },
            {
                name: 'পুরুষ পাঞ্জাবি — মুজিব কোট সেট',
                description: 'ঐতিহ্যবাহী মুজিব কোট সহ এই পাঞ্জাবি সেটটি জাতীয় দিবস, পুরস্কার অনুষ্ঠান বা বিয়েতে পরার জন্য। গাঢ় রঙের মুজিব কোটের সাথে সাদা পাঞ্জাবি — ক্লাসিক কম্বিনেশন।',
                tagline: 'দেশীয় আভিজাত্যের প্রতীক',
                price: 2600, originalPrice: 3500,
                thumbnail: IMGS.panj2[0], images: IMGS.panj2,
                category: cat('fashion'),
                tags: ['পাঞ্জাবি', 'মুজিব কোট', 'পুরুষ', 'panjabi', 'mujib coat'],
                colors: ['কালো-সাদা', 'নেভি-সাদা', 'মেরুন-সাদা'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                aiLabels: ['panjabi', 'mujib coat', 'men', 'formal', 'traditional'],
                stock: 40, rating: 4.8, reviewCount: 52, totalSold: 198, viewCount: 3600,
            },
        ];

        // ── Add computed fields ──────────────────────────────
        products.forEach(p => {
            p.slug        = makeSlug(p.name);
            p.sku         = makeSku();
            p.status      = 'active';
            p.visibility  = 'visible';
            p.isDeleted   = false;
            p.priceType   = 'negotiable';
            p.productType = 'simple';
            if (p.originalPrice && p.originalPrice > p.price) {
                p.discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
            }
            p.likeCount    = Math.floor(Math.random() * 80) + 10;
            p.commentCount = p.reviewCount;
            p.shareCount   = Math.floor(Math.random() * 40) + 5;
        });

        // ── Clear old products & insert new ─────────────────
        const deleted = await Product.deleteMany({});
        console.log(`\n🗑  Cleared ${deleted.deletedCount} old products`);

        const result = await Product.insertMany(products);
        console.log(`\n✅ Inserted ${result.length} products:\n`);
        result.forEach(p => console.log(`   • ${p.name} — ৳${p.price} (discount: ${p.discount}%)`));

        await mongoose.disconnect();
        console.log('\n🎉 Seeding complete!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

seed();
