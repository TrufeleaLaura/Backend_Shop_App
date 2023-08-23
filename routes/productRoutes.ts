import express from "express";
import getAllProducts, {
    getAllCategories,
    getAllProductsWithLimit,
    getFilterProducts,
    getProductById
} from "../controllers/productController.js";

const router=express.Router();

router.route('/').post(getAllProductsWithLimit)
router.route('/').get(getAllProducts);
router.route('/filter').post(getFilterProducts);
router.route('/categories').get(getAllCategories);
router.route('/:productId').get(getProductById);

export default router;