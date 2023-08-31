import express from "express";
import {
    addOrder,
    getOrderById,
    getOrdersByUserId,
    getPurchasedProductsByOrderId,
    setStatusToOrder
} from "../controllers/orderController.js";

const router=express.Router();

router.route('/one-order/:userId/:orderId').get(getOrderById);
router.route('/all-orders/:userId').get(getOrdersByUserId);
router.route('/:userId').post(addOrder);
router.route('/status').put(setStatusToOrder);
//router.route('/purchased/products').get(getPurchasedProductsByOrderId);

export default router;