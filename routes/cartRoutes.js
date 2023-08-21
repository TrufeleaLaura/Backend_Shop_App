import express from "express";
import { deleteCartItem, getCartByUserId, updateCartItem } from "../controllers/cartController.js";
const router = express.Router();
router.route('/:userId').get(getCartByUserId);
router.route('/:userId').post(updateCartItem);
router.route('/:userId/:productId').delete(deleteCartItem);
export default router;
