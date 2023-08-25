import express from "express";
import {addOrder, getOrderById, getOrdersByUserId} from "../controllers/orderController.js";

const router=express.Router();

router.route('/one-order/:userId/:orderId').get(getOrderById);
router.route('/all-orders/:userId').get(getOrdersByUserId);
router.route('/:userId').post(addOrder);

export default router;