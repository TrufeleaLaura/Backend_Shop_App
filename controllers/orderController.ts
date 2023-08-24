import jsonwebtoken from "jsonwebtoken";
import verifyTokenAndRetrieveObject from "../service/userService.js";
import OrderModel, {Order} from "../model/order.js";
import {Request, Response} from "express";
import CartModel from "../model/cart.js";
import {createOrEmptyCartForUser} from "../service/cartService.js";
import mongoose, {Types} from "mongoose";
import order from "../model/order.js";


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

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId;
        const user = await verifyTokenAndRetrieveObject(token, userId);
        const orders = await OrderModel.find({userId: userId.trim()});
        res.status(200).json(orders);
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({error: 'Invalid token'});
        }
            else {
            console.error('Error fetching orders by userId:', error);
            res.status(400).json({error: error.message});
        }
    }
}

export const addOrder = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId,
            user = await verifyTokenAndRetrieveObject(token, req.params.userId),
            newOrder: Order = {
                userId: userId.trim(),
                products: req.body.products,
                total: req.body.total,
                paymentMethod: req.body.paymentMethod,
                address: req.body.address,
                date: new Date().toISOString(),
                deliveryStatus: 'Pending'
            }
        await OrderModel.create(newOrder);
        const cartToRefresh = await CartModel.findOne({userId: userId.trim()});
        if (!cartToRefresh) throw new Error('Cart not found');
        createOrEmptyCartForUser(userId);
        res.status(201).json(newOrder);
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({error: 'Invalid token'});
        } else {
            console.error('Error adding order:', error);
            res.status(400).json({error: error.message});
        }
    }
}

