import { Category } from './category.model';
import AppError from '../../utils/AppError';

// Slugify a string to lowercase latin-kebab. Returns '' when the input has no
// latin/number characters (e.g. a Bengali name) so callers can fall back.
const slugify = (input: string) =>
    (input || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const CategoryService = {
    async getAllCategories() {
        return await Category.find({ isDeleted: false, isActive: true })
            .populate('parent', 'name slug')
            .sort({ level: 1, order: 1, name: 1 });
    },

    async getAllCategoriesAdmin() {
        return await Category.find({ isDeleted: false })
            .populate('parent', 'name slug')
            .sort({ level: 1, order: 1 });
    },

    async getCategoryById(id: string) {
        const category = await Category.findById(id).populate('parent', 'name slug');
        if (!category || category.isDeleted) throw new AppError(404, 'Category not found');
        return category;
    },

    async createCategory(payload: any) {
        // Set level based on parent
        if (payload.parent) {
            const parent = await Category.findById(payload.parent);
            if (!parent) throw new AppError(404, 'Parent category not found');
            payload.level = parent.level + 1;
        } else {
            payload.level = 0;
        }

        // Use an explicit slug if given, otherwise derive from the name.
        // Bengali (non-latin) names slugify to '' — fall back to a stable base
        // so creation never fails on the unique-slug index.
        let base = slugify(payload.slug || payload.name) || 'category';
        const existing = await Category.findOne({ slug: base });
        payload.slug = existing ? `${base}-${Date.now()}` : base;

        return await Category.create(payload);
    },

    async updateCategory(id: string, payload: any) {
        // Only change the slug when one is explicitly provided (keeps URLs stable
        // when an admin just edits the name). Ensure it stays unique.
        if (payload.slug !== undefined) {
            const base = slugify(payload.slug);
            if (base) {
                const clash = await Category.findOne({ slug: base, _id: { $ne: id } });
                payload.slug = clash ? `${base}-${Date.now()}` : base;
            } else {
                delete payload.slug; // empty / non-latin → leave existing slug untouched
            }
        }

        // Recompute level if the parent changed.
        if (payload.parent !== undefined) {
            if (payload.parent) {
                const parent = await Category.findById(payload.parent);
                if (!parent) throw new AppError(404, 'Parent category not found');
                payload.level = parent.level + 1;
            } else {
                payload.level = 0;
            }
        }

        const category = await Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        if (!category) throw new AppError(404, 'Category not found');
        return category;
    },

    async deleteCategory(id: string) {
        const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!category) throw new AppError(404, 'Category not found');
        return category;
    },
};

export default CategoryService;
