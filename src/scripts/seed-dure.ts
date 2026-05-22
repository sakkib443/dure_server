import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../app/modules/product/product.model';
import { Category } from '../app/modules/category/category.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// ── Category tree ─────────────────────────────────────────────────────────────

const CATEGORY_TREE = [
    {
        name: 'মিমিক্রি',
        slug: 'mimicry',
        description: 'উন্নত মানের মিমিক্রি কালেকশন — সুলভ মূল্যে সেরা মানের পোশাক।',
        icon: '👗',
        subcategories: [
            {
                name: 'সুতি মিমিক্রি',
                slug: 'suti-mimicry',
                description: 'নরম ও আরামদায়ক সুতি কাপড়ের মিমিক্রি ড্রেস।',
            },
            {
                name: 'জর্জেট মিমিক্রি',
                slug: 'georgette-mimicry',
                description: 'হালকা ও মসৃণ জর্জেট ফ্যাব্রিকের মিমিক্রি পোশাক।',
            },
        ],
    },
    {
        name: 'জামদানি শাড়ি',
        slug: 'jamdani-saree',
        description: 'ঐতিহ্যবাহী ঢাকাই জামদানি — বাংলাদেশের গর্ব।',
        icon: '🌸',
        subcategories: [
            {
                name: 'ঢাকাই জামদানি',
                slug: 'dhakai-jamdani',
                description: 'খাঁটি ঢাকাই তাঁতের জামদানি শাড়ি, হাতে বোনা ঐতিহ্যবাহী ডিজাইন।',
            },
            {
                name: 'রঙিন জামদানি',
                slug: 'colorful-jamdani',
                description: 'উজ্জ্বল রঙ ও আধুনিক ডিজাইনের জামদানি শাড়ি।',
            },
        ],
    },
    {
        name: 'মেয়েদের ড্রেস',
        slug: 'womens-dress',
        description: 'আধুনিক ও ঐতিহ্যবাহী মেয়েদের পোশাক কালেকশন।',
        icon: '✨',
        subcategories: [
            {
                name: 'সালোয়ার কামিজ',
                slug: 'salwar-kameez',
                description: 'বিভিন্ন ডিজাইনের সালোয়ার কামিজ — পার্টি থেকে দৈনন্দিন পরিধানের জন্য।',
            },
            {
                name: 'কুর্তি',
                slug: 'kurti',
                description: 'আরামদায়ক ও ট্রেন্ডি কুর্তি কালেকশন।',
            },
        ],
    },
    {
        name: 'অলংকার',
        slug: 'ornaments',
        description: 'নারীর সৌন্দর্য বৃদ্ধিতে অনন্য অলংকার সংগ্রহ।',
        icon: '💎',
        subcategories: [
            {
                name: 'গলার হার',
                slug: 'necklace',
                description: 'সোনালি, রুপালি ও পাথরখচিত গলার হার কালেকশন।',
            },
            {
                name: 'চুড়ি ও কানের দুল',
                slug: 'bangles-earrings',
                description: 'ঐতিহ্যবাহী ও আধুনিক চুড়ি এবং কানের দুলের সংগ্রহ।',
            },
        ],
    },
    {
        name: 'লেহেঙ্গা',
        slug: 'lehenga',
        description: 'বিশেষ উপলক্ষের জন্য অপূর্ব লেহেঙ্গা কালেকশন।',
        icon: '👑',
        subcategories: [
            {
                name: 'ব্রাইডাল লেহেঙ্গা',
                slug: 'bridal-lehenga',
                description: 'বিয়ের জন্য বিশেষভাবে তৈরি ব্রাইডাল লেহেঙ্গা।',
            },
            {
                name: 'পার্টি লেহেঙ্গা',
                slug: 'party-lehenga',
                description: 'পার্টি ও উৎসবের জন্য ট্রেন্ডি লেহেঙ্গা কালেকশন।',
            },
        ],
    },
];

// ── Product data ──────────────────────────────────────────────────────────────

const PRODUCTS = [
    // ── মিমিক্রি ──────────────────────────────────────────────────────────────
    {
        name: 'লালপাড় সুতি মিমিক্রি সেট',
        subcategorySlug: 'suti-mimicry',
        description: `<p>আরামদায়ক ও টেকসই সুতি কাপড়ের মিমিক্রি সেট। বাড়িতে বসে থাকা থেকে হালকা আড্ডা — সব পরিবেশে মানানসই।</p>
<ul>
<li>কাপড়: ১০০% খাঁটি সুতি</li>
<li>ধরন: থ্রি-পিস সেট (কামিজ + পায়জামা + ওড়না)</li>
<li>সাইজ: S, M, L, XL, XXL</li>
<li>রঙ: লাল পাড় সাদা</li>
</ul>`,
        tagline: 'আরামের সাথে স্টাইল',
        price: 650,
        originalPrice: 850,
        colors: ['White', 'Red'],
        colorHex: ['#FFFFFF', '#DC143C'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 40,
        tags: ['mimicry', 'cotton', 'three-piece', 'comfortable', 'daily-wear'],
        thumbnail: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা (২-৩ দিন)। ঢাকার বাইরে: ১২০ টাকা (৪-৫ দিন)।',
        careInfo: 'ঠান্ডা পানিতে হাত দিয়ে ধুতে হবে। রোদে শুকাতে হবে।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },
    {
        name: 'গোলাপি জর্জেট মিমিক্রি',
        subcategorySlug: 'georgette-mimicry',
        description: `<p>হালকা ওজনের জর্জেট ফ্যাব্রিকে তৈরি এলিগেন্ট মিমিক্রি পোশাক। পার্টি বা বিশেষ অনুষ্ঠানের জন্য আদর্শ।</p>
<ul>
<li>কাপড়: প্রিমিয়াম জর্জেট</li>
<li>কাজ: এম্ব্রয়ডারি ও পাথরের কাজ</li>
<li>সাইজ: S, M, L, XL</li>
<li>রঙ: বেবি পিংক</li>
</ul>`,
        tagline: 'হালকা কাপড়, ভারী সৌন্দর্য',
        price: 1200,
        originalPrice: 1600,
        colors: ['Pink', 'Lavender'],
        colorHex: ['#FFB6C1', '#E6E6FA'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 25,
        tags: ['mimicry', 'georgette', 'party-wear', 'embroidery', 'pink'],
        thumbnail: 'https://images.unsplash.com/photo-1594938298603-c8148c4b984c?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b984c?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা (২-৩ দিন)। ঢাকার বাইরে: ১২০ টাকা (৪-৫ দিন)।',
        careInfo: 'ড্রাই ক্লিন বা হালকা হাতে ধোয়া। মেশিনে ধোবেন না।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },

    // ── জামদানি শাড়ি ─────────────────────────────────────────────────────────
    {
        name: 'নীলাম্বরী ঢাকাই জামদানি শাড়ি',
        subcategorySlug: 'dhakai-jamdani',
        description: `<p>খাঁটি ঢাকাই তাঁতে হাতে বোনা রাজকীয় নীল জামদানি শাড়ি। সোনালি জরি কাজ এবং ঐতিহ্যবাহী মোটিফে সজ্জিত।</p>
<ul>
<li>কাপড়: ফাইন সিল্ক ব্লেন্ড</li>
<li>কাজ: সোনালি জরি ওয়েভিং</li>
<li>দৈর্ঘ্য: ৬.৫ মিটার (ব্লাউজ পিস সহ)</li>
<li>উপলক্ষ: বিয়ে, উৎসব, ঈদ</li>
</ul>`,
        tagline: 'প্রতিটি সুতায় ঐতিহ্যের ছোঁয়া',
        price: 4500,
        originalPrice: 5500,
        colors: ['Blue', 'Gold'],
        colorHex: ['#00008B', '#FFD700'],
        sizes: ['Free Size'],
        stock: 15,
        tags: ['dhakai', 'jamdani', 'saree', 'silk', 'wedding', 'traditional', 'handloom'],
        thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা। ঢাকার বাইরে: ১৫০ টাকা। ৫০০০ টাকার উপরে অর্ডারে ফ্রি ডেলিভারি।',
        careInfo: 'ড্রাই ক্লিন করুন। সুতি কাপড়ে মুড়িয়ে ঠান্ডা ও শুকনো জায়গায় সংরক্ষণ করুন।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },
    {
        name: 'লাল-সবুজ রঙিন জামদানি',
        subcategorySlug: 'colorful-jamdani',
        description: `<p>বাংলাদেশের জাতীয় রঙে সাজানো অপরূপ সুন্দর জামদানি শাড়ি। ঈদ ও বিশেষ উৎসবে পরিধানের জন্য আদর্শ।</p>
<ul>
<li>কাপড়: হ্যান্ডলুম কটন-সিল্ক</li>
<li>কাজ: ঐতিহ্যবাহী বুটিদার ডিজাইন</li>
<li>দৈর্ঘ্য: ৬.৫ মিটার</li>
<li>বিশেষত্ব: পরিবেশবান্ধব প্রাকৃতিক রং</li>
</ul>`,
        tagline: 'দেশের রঙে সাজো নিজেকে',
        price: 2800,
        originalPrice: 3500,
        colors: ['Red', 'Green'],
        colorHex: ['#DC143C', '#006400'],
        sizes: ['Free Size'],
        stock: 20,
        tags: ['jamdani', 'saree', 'colorful', 'eid', 'national-colors', 'handloom'],
        thumbnail: 'https://images.unsplash.com/photo-1583750908653-5d7b8a4f0b7a?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1583750908653-5d7b8a4f0b7a?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা। ঢাকার বাইরে: ১৫০ টাকা।',
        careInfo: 'হালকা হাতে ধোন। ছায়ায় শুকান। গরম ইস্ত্রি করবেন না।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },

    // ── মেয়েদের ড্রেস ─────────────────────────────────────────────────────────
    {
        name: 'আনারকলি সালোয়ার কামিজ',
        subcategorySlug: 'salwar-kameez',
        description: `<p>দীর্ঘ আনারকলি কাটের সালোয়ার কামিজ, যা আপনার ব্যক্তিত্বকে আরও উজ্জ্বল করে তুলবে। পার্টি ও পারিবারিক অনুষ্ঠানের জন্য সেরা পছন্দ।</p>
<ul>
<li>কাপড়: প্রিমিয়াম রেয়ন</li>
<li>কাটিং: আনারকলি ফ্লেয়ার</li>
<li>কাজ: গোলাপ এম্ব্রয়ডারি</li>
<li>সাইজ: S, M, L, XL, XXL</li>
</ul>`,
        tagline: 'আধুনিকতায় ঐতিহ্যের মিশেল',
        price: 1850,
        originalPrice: 2400,
        colors: ['Peach', 'Sky Blue', 'Mint Green'],
        colorHex: ['#FFCBA4', '#87CEEB', '#98FF98'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 35,
        tags: ['salwar-kameez', 'anarkali', 'party-wear', 'embroidery', 'womens-dress'],
        thumbnail: 'https://images.unsplash.com/photo-1614886137799-65a35c8cc6da?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1614886137799-65a35c8cc6da?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা (২-৩ দিন)। ঢাকার বাইরে: ১২০ টাকা (৪-৫ দিন)।',
        careInfo: 'হালকা হাতে ধোন বা ড্রাই ক্লিন করুন।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },
    {
        name: 'ফ্লোরাল প্রিন্ট কুর্তি',
        subcategorySlug: 'kurti',
        description: `<p>ফুলের প্রিন্টে সাজানো আরামদায়ক ও ট্রেন্ডি কুর্তি। জিন্স বা পায়জামার সাথে পরুন — যেকোনো পরিবেশেই মানাবে।</p>
<ul>
<li>কাপড়: রেয়ন ক্রেপ</li>
<li>প্রিন্ট: ডিজিটাল ফ্লোরাল</li>
<li>লেন্থ: হিপ লেন্থ (৩৮ ইঞ্চি)</li>
<li>সাইজ: S, M, L, XL, XXL</li>
</ul>`,
        tagline: 'ফুলের মতো ফুটে উঠুন প্রতিদিন',
        price: 750,
        originalPrice: 999,
        colors: ['Pink Floral', 'Blue Floral', 'Yellow Floral'],
        colorHex: ['#FF9999', '#99CCFF', '#FFFF99'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 50,
        tags: ['kurti', 'floral', 'casual', 'daily-wear', 'trendy'],
        thumbnail: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা (২-৩ দিন)। ঢাকার বাইরে: ১২০ টাকা (৪-৫ দিন)।',
        careInfo: 'মেশিনে বা হাতে ধোয়া যাবে। সরাসরি রোদে না শুকিয়ে ছায়ায় শুকান।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },

    // ── অলংকার ────────────────────────────────────────────────────────────────
    {
        name: 'অ্যান্টিক গোল্ড নেকলেস সেট',
        subcategorySlug: 'necklace',
        description: `<p>অ্যান্টিক সোনালি রঙের ঐতিহ্যবাহী গলার হার সেট। ম্যাচিং কানের দুল সহ। বিয়ে, পূজা বা যেকোনো বিশেষ অনুষ্ঠানের জন্য আদর্শ।</p>
<ul>
<li>উপাদান: ব্রাস মেটাল + সোনালি ইলেক্ট্রোপ্লেটিং</li>
<li>পাথর: কৃত্রিম মুক্তা ও লাল পাথর</li>
<li>সেট: হার + ম্যাচিং কানের দুল</li>
<li>প্যাকেজিং: গিফট বক্সে প্যাক করা</li>
</ul>`,
        tagline: 'ঐতিহ্যের সৌন্দর্য, আধুনিক ডিজাইন',
        price: 980,
        originalPrice: 1400,
        colors: ['Antique Gold'],
        colorHex: ['#CFB53B'],
        sizes: ['Standard'],
        stock: 30,
        tags: ['necklace', 'ornaments', 'jewelry', 'antique-gold', 'bridal', 'set'],
        thumbnail: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা। ঢাকার বাইরে: ১০০ টাকা।',
        careInfo: 'পানি থেকে দূরে রাখুন। নরম কাপড় দিয়ে মুছুন। বায়ুরোধী বাক্সে সংরক্ষণ করুন।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },
    {
        name: 'মাটির চুড়ি ও কানের দুল সেট',
        subcategorySlug: 'bangles-earrings',
        description: `<p>হাতে তৈরি মাটির চুড়ি ও ঝুমকা কানের দুলের সেট। রঙিন ও ঐতিহ্যবাহী ডিজাইন যা যেকোনো পোশাকের সাথে মানানসই।</p>
<ul>
<li>উপাদান: টেরাকোটা মাটি</li>
<li>কাজ: হাতে রঙ করা ঐতিহ্যবাহী মোটিফ</li>
<li>সেট: ৬টি চুড়ি + ১ জোড়া ঝুমকা</li>
<li>বিশেষত্ব: পরিবেশবান্ধব ও হস্তশিল্প</li>
</ul>`,
        tagline: 'মাটির গন্ধে মেশানো রূপকথা',
        price: 450,
        originalPrice: 650,
        colors: ['Multicolor'],
        colorHex: ['#E07B54'],
        sizes: ['2.4"', '2.6"', '2.8"'],
        stock: 60,
        tags: ['bangles', 'earrings', 'terracotta', 'handmade', 'traditional', 'set'],
        thumbnail: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ৮০ টাকা। ঢাকার বাইরে: ১০০ টাকা।',
        careInfo: 'পানিতে ডুবাবেন না। নরম কাপড় দিয়ে মুছে সংরক্ষণ করুন।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },

    // ── লেহেঙ্গা ──────────────────────────────────────────────────────────────
    {
        name: 'রাজকীয় ব্রাইডাল লেহেঙ্গা',
        subcategorySlug: 'bridal-lehenga',
        description: `<p>ভারী এম্ব্রয়ডারি ও জরি কাজে সজ্জিত অপূর্ব ব্রাইডাল লেহেঙ্গা। আপনার বিশেষ দিনকে আরও স্মরণীয় করে তুলুন।</p>
<ul>
<li>কাপড়: ভেলভেট + নেট ওড়না</li>
<li>কাজ: জরদৌজি এম্ব্রয়ডারি ও মিরর ওয়ার্ক</li>
<li>রঙ: ডিপ মেরুন ও গোল্ড</li>
<li>সেট: লেহেঙ্গা + চোলি + ওড়না</li>
</ul>`,
        tagline: 'তোমার স্বপ্নের দিনটি হোক অনন্য',
        price: 8500,
        originalPrice: 12000,
        colors: ['Maroon', 'Red', 'Burgundy'],
        colorHex: ['#800000', '#DC143C', '#800020'],
        sizes: ['S', 'M', 'L', 'XL', 'Custom'],
        stock: 10,
        tags: ['lehenga', 'bridal', 'wedding', 'velvet', 'embroidery', 'heavy-work'],
        thumbnail: 'https://images.unsplash.com/photo-1629994133547-21c36b6dd219?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1629994133547-21c36b6dd219?w=800&h=1000&fit=crop'],
        deliveryInfo: 'বিশেষ প্যাকেজিংয়ে ডেলিভারি দেওয়া হয়। ঢাকার ভেতরে: ১৫০ টাকা। ঢাকার বাইরে: ২৫০ টাকা।',
        careInfo: 'শুধুমাত্র ড্রাই ক্লিন। সুতি কাপড়ে মুড়িয়ে ঠান্ডা জায়গায় রাখুন।',
        paymentInfo: 'অগ্রিম ৫০% পেমেন্ট প্রয়োজন। বিকাশ, নগদ, রকেট গ্রহণযোগ্য।',
    },
    {
        name: 'গ্লিটার পার্টি লেহেঙ্গা',
        subcategorySlug: 'party-lehenga',
        description: `<p>চকচকে গ্লিটার ফ্যাব্রিকে তৈরি ট্রেন্ডি পার্টি লেহেঙ্গা। যেকোনো অনুষ্ঠানে মনোযোগের কেন্দ্রবিন্দু হয়ে উঠুন।</p>
<ul>
<li>কাপড়: শিমার নেট + ইনার লাইনিং</li>
<li>কাজ: গ্লিটার প্রিন্ট ও সিকোয়েন্স</li>
<li>রঙ: নেভি ব্লু ও সিলভার</li>
<li>সেট: লেহেঙ্গা + ক্রপ টপ + ওড়না</li>
</ul>`,
        tagline: 'পার্টিতে হোক তুমিই সেরা আকর্ষণ',
        price: 3200,
        originalPrice: 4500,
        colors: ['Navy Blue', 'Magenta', 'Black'],
        colorHex: ['#000080', '#FF00FF', '#000000'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 20,
        tags: ['lehenga', 'party', 'glitter', 'sequin', 'festive', 'trendy'],
        thumbnail: 'https://images.unsplash.com/photo-1602573991155-21f0143bb489?w=600&h=800&fit=crop',
        images: ['https://images.unsplash.com/photo-1602573991155-21f0143bb489?w=800&h=1000&fit=crop'],
        deliveryInfo: 'ঢাকার ভেতরে: ১০০ টাকা (২-৩ দিন)। ঢাকার বাইরে: ১৫০ টাকা (৪-৫ দিন)।',
        careInfo: 'শুধুমাত্র ড্রাই ক্লিন। মেশিনে ধোবেন না।',
        paymentInfo: 'বিকাশ, নগদ, রকেট এবং ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যাচ্ছে।',
    },
];

// ── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
    try {
        console.log('\n🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.DATABASE_URL || '');
        console.log('✅ Connected!\n');

        // ── Step 1: Create parent categories ──────────────────────────────────
        console.log('📂 Creating categories...\n');
        const subcategoryMap: Record<string, mongoose.Types.ObjectId> = {};

        for (const cat of CATEGORY_TREE) {
            let parent = await Category.findOne({ slug: cat.slug, level: 0 });
            if (!parent) {
                parent = await Category.create({
                    name: cat.name,
                    slug: cat.slug,
                    description: cat.description,
                    icon: cat.icon,
                    level: 0,
                    isActive: true,
                    isFeatured: true,
                    showInMenu: true,
                    showInHome: true,
                });
                console.log(`  ✅ Parent: ${parent.name}`);
            } else {
                console.log(`  ⏩ Exists: ${parent.name}`);
            }

            // ── Step 2: Create subcategories ──────────────────────────────────
            for (const sub of cat.subcategories) {
                let subcat = await Category.findOne({ slug: sub.slug, level: 1 });
                if (!subcat) {
                    subcat = await Category.create({
                        name: sub.name,
                        slug: sub.slug,
                        description: sub.description,
                        parent: parent._id,
                        level: 1,
                        isActive: true,
                        showInMenu: true,
                        showInHome: false,
                    });
                    console.log(`     ✅ Sub: ${subcat.name}`);
                } else {
                    console.log(`     ⏩ Exists: ${subcat.name}`);
                }
                subcategoryMap[sub.slug] = subcat._id as mongoose.Types.ObjectId;
            }
        }

        // ── Step 3: Create products ────────────────────────────────────────────
        console.log('\n🛍️  Creating products...\n');

        for (const item of PRODUCTS) {
            const existing = await Product.findOne({ name: item.name });
            if (existing) {
                console.log(`  ⏩ Exists: ${item.name}`);
                continue;
            }

            const categoryId = subcategoryMap[item.subcategorySlug];
            if (!categoryId) {
                console.log(`  ❌ Subcategory not found for: ${item.name}`);
                continue;
            }

            const { subcategorySlug, ...productData } = item;
            await Product.create({
                ...productData,
                category: categoryId,
                priceType: 'fixed',
                productType: 'simple',
                status: 'active',
                visibility: 'visible',
            });
            console.log(`  ✅ Product: ${item.name}`);
        }

        console.log('\n🎉 Seeding completed successfully!\n');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
