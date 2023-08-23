import ProductModel from "../model/product.js";
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId, product = await ProductModel.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(200).json(product);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(400).json({ error: 'Error fetching product' });
    }
};
export const getAllCategories = async (req, res) => {
    try {
        const categories = await ProductModel.distinct('category');
        res.status(200).json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(400).json({ error: 'Error fetching categories' });
    }
};
export const getAllProductsWithLimit = async (req, res) => {
    try {
        const limit = req.body.limit || 9, skip = req.body.skip, products = await ProductModel.find()
            .skip(skip)
            .limit(limit);
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(400).json({ error: 'Error fetching products' });
    }
};
export const getFilterProducts = async (req, res) => {
    try {
        const selectedCategories = req.body.categories, skip = req.body.skip, limit = req.body.limit || 9, products = await ProductModel.find({ category: { $in: selectedCategories } })
            .skip(skip)
            .limit(limit);
        res.status(200).json(products);
        // }
    }
    catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'An error occurred while retrieving products' });
    }
};
export default getProductById;
