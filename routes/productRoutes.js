import express from "express";
import { getAllCategories, getAllProductsWithLimit, getFilterProducts, getProductById, searchProducts } from "../controllers/productController.js";
const router = express.Router();
router.route('/').post(getAllProductsWithLimit);
router.route('/filter').post(getFilterProducts);
router.route('/categories').get(getAllCategories);
router.route('/:productId').get(getProductById);
router.route('/search/:searchTerm').get(searchProducts);
export default router;
//# sourceMappingURL=productRoutes.js.map