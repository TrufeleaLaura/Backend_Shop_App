import ProductModel from "../model/product.js";
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(400).json({ error: 'Error fetching products' });
    }
};
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await ProductModel.findOne({ id: productId });
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
export const getFilterProducts = async (req, res) => {
    try {
        const selectedCategories = req.body.categories;
        const nextProductsNumber = req.body.nextProductsNumber;
        const skip = req.body.productsInPage;
        if (selectedCategories.length === 0) {
            const products = await ProductModel.find()
                .skip(skip)
                .limit(nextProductsNumber);
            res.status(200).json(products);
        }
        else {
            const products = await ProductModel.find({ category: { $in: selectedCategories } })
                .skip(skip)
                .limit(nextProductsNumber);
            res.status(200).json(products);
        }
    }
    catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'An error occurred while retrieving products' });
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
export default getAllProducts;
