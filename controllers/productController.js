import ProductModel from "../model/product.js";
/**
 * The function returns product from by id database
 * @param req Request, productId: String
 * @param res: Response, Product: Object
 * @return {Object} Product
 * @throws {400} If there's an error while fetching the product.
 */
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
/**
 * The function returns all the categories from database
 * @param req:Request
 * @param res:Response, categories: Array
 * @return {Array} categories
 * @throws {400} If there's an error while fetching the categories.
 */
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
/**
 * the function returns all products skipping a certain number and bringing a certain number of products
 * @param req:Request, limit: Number, skip: Number
 * @param res:Response, products: Array
 * @return {Array} products
 * @throws {400} If there's an error while fetching the products.
 */
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
/**
 * the function returns all products that have the category in the given categories array,
 * skipping a certain number and bringing a certain number of products
 * @param req:Request, categories: Array, limit: Number, skip: Number
 * @param res:Response, products: Array
 * @return {Array} products
 * @throws {400} If there's an error while fetching the products.
 */
export const getFilterProducts = async (req, res) => {
    try {
        const selectedCategories = req.body.categories, skip = req.body.skip, limit = req.body.limit || 9, products = await ProductModel.find({ category: { $in: selectedCategories } })
            .skip(skip)
            .limit(limit);
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'An error occurred while retrieving products' });
    }
};
/**
 * the function returns all products that have the searchTerm in their title
 * @param req:Request, searchTerm: String
 * @param res:Response, products: Array
 * @return {Array} products
 * @throws {400} If there's an error while fetching the products.
 */
export const searchProducts = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm, products = await ProductModel.find({ title: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'An error occurred while retrieving products' });
    }
};
export default getProductById;
//# sourceMappingURL=productController.js.map