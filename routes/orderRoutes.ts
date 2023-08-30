import express from "express";
import {addOrder, getOrderById, getOrdersByUserId, setStatusToOrder} from "../controllers/orderController.js";

const router=express.Router();

router.route('/one-order/:userId/:orderId').get(getOrderById);
router.route('/all-orders/:userId').get(getOrdersByUserId);
router.route('/:userId').post(addOrder);
router.route('/status').put(setStatusToOrder);

export default router;