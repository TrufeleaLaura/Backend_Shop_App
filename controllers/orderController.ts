import jsonwebtoken from "jsonwebtoken";
import verifyTokenAndRetrieveUser from "../service/userService.js";
import OrderModel, {Order} from "../model/order.js";
import {Request, Response} from "express";
import CartModel from "../model/cart.js";
import {createOrEmptyCartForUser} from "../service/cartService.js";

/**
 * The function returns the content of the order for a user, if the user is authenticated.
 * @param req:Request, orderId: String
 * @param res:Response, Order: Object
 * @return {Object} Order
 * * @throws {401} If the provided token is invalid.
 */
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId,
            order = await OrderModel.findById(orderId.trim());
        res.status(200).json(order);
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({error: 'Invalid token'});
        } else {
            console.error('Error fetching order by userId:', error);
            res.status(400).json({error: error.message});
        }
    }
}

/**
 * The function returns all the orders for a user, if the user is authenticated.
 * @param req:Request, userId: String
 * @param res:Response, Order: Object
 * @return {Object} Order
 * * @throws {401} If the provided token is invalid.
 * * @throws {400} If there's an error while fetching the orders.
 */
export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId,
            user = await verifyTokenAndRetrieveUser(token, userId),
            orders = await OrderModel.find({userId: userId.trim()});
        res.status(200).json(orders);
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({error: 'Invalid token'});
        } else {
            console.error('Error fetching orders by userId:', error);
            res.status(400).json({error: error.message});
        }
    }
}
/**
 * The function adds a new order for a user, if the user is authenticated.
 * @param req:Request, userId: String, phoneNumber: String, fullName: String, products: Array, total: Number, paymentMethod: String, address: String
 * @param res:Response, Cart: Object
 * @return {Object} Cart
 * * @throws {401} If the provided token is invalid.
 * * @throws {400} If there's an error while adding the order.
 */
export const addOrder = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId,
            user = await verifyTokenAndRetrieveUser(token, req.params.userId),
            newOrder: Order = {
                userId: userId.trim(),
                phoneNumber: req.body.phoneNumber,
                fullName: req.body.fullName,
                products: req.body.products,
                total: req.body.total,
                paymentMethod: req.body.paymentMethod,
                address: req.body.address,
                date: new Date().toISOString().split('T')[0],
                deliveryStatus: 'Pending'
            }
        await OrderModel.create(newOrder);
        const cartToRefresh = await CartModel.findOne({userId: userId.trim()});
        if (!cartToRefresh) throw new Error('Cart not found');
        const cart = await createOrEmptyCartForUser(userId);
        res.status(201).json(cart);
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({error: 'Invalid token'});
        } else {
            console.error('Error adding order:', error);
            res.status(400).json({error: error.message});
        }
    }
}

