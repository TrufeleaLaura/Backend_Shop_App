import {Request, Response} from 'express';
import CartModel from "../model/cart.js";
import jsonwebtoken from "jsonwebtoken";
import ProductModel from "../model/product.js";
import {addNewCartItem, modifyCartItem} from "../service/cartService.js";
import verifyTokenAndRetrieveUser from "../service/userService.js";


export const getCartByUserId = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId,
            user = await verifyTokenAndRetrieveUser(token, userId),
            cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            throw new Error('Cart not found');
        }
        res.status(200).json(cart);
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({error: 'Invalid token'});
        } else {
            console.error('Error fetching cart by userId:', error);
            res.status(400).json({error: error.message});
        }
    }
}

export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId,
            user = await verifyTokenAndRetrieveUser(token, userId),
            {productId, quantity} = req.body,
            cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            throw new Error('Cart not found');
        }
        const cartItem = cart.products.find(item => item.productId === productId);
        if (cartItem) {
            modifyCartItem(cartItem, quantity, cart);
        } else {
            const productToAddDoc = await ProductModel.findOne({id: productId});
            if (!productToAddDoc) {
                return res.status(404).json({error: 'Product not found'});
            }
            addNewCartItem(productToAddDoc, quantity, cart);
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error: any) {
        console.error('Error updating cart item:', error);
        res.status(400).json({error: error.message});
    }
}


export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1],
            userId = req.params.userId,
            user = await verifyTokenAndRetrieveUser(token, userId),
            productId = req.params.productId,
            cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            throw new Error('Cart not found');
        }
        const cartItem = cart?.products.find(item => item.productId === Number(productId));
        if (!cartItem) {
            return res.status(404).json({error: 'Cart item not found'});
        }
        cart.products = cart.products.filter(item => item.productId !== Number(productId));
        cart.totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
        cart.totalProducts = cart.products.length;
        cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({error: 'Internal server error'});
    }

}