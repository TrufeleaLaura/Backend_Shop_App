import { Request, Response } from 'express';
import CartModel from "../model/cart.js";
import {CartItem} from "../model/interfaces.js";
import ProductModel from "../model/product.js";

export const getCartByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart by userId:', error);
        res.status(404).json({ error: 'Error fetching cart by userId' });
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.findOne({ userId });
        //console.log(cart)
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        //console.log(req.body)
        const { productId, quantity } = req.body;
        //console.log(productId, quantity)
        const cartItem = cart.products.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity+=quantity;
            cartItem.total = cartItem.quantity * cartItem.price;
            cartItem.discountedPrice = cartItem.total * (1 - cartItem.discountPercentage / 100);
            cart.totalQuantity= cart.totalQuantity+quantity;
            cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
        } else {
            const productToAddDoc= await ProductModel.findOne({ id: productId });
            if(!productToAddDoc){
                return res.status(404).json({ error: 'Product not found' });
            }
            // console.log("id:  "+ productToAddDoc.get('id'));
            // console.log("price:  "+ productToAddDoc.get('price'));
            // console.log("title:  "+ productToAddDoc.get('title'));
            // console.log("thumbnail:  "+ productToAddDoc.get('thumbnail'));
            // console.log("discountPercentage:  "+ productToAddDoc.get('discountPercentage'));
            // console.log("discountedPrice:  "+ productToAddDoc.get('discountedPrice'));

            const newItem:CartItem={
                productId: productToAddDoc.get('id'),
                quantity: 1,
                total: productToAddDoc.get('price'),
                price:productToAddDoc.get('price'),
                title:productToAddDoc.get('title'),
                thumbnail:productToAddDoc.get('thumbnail'),
                discountPercentage:productToAddDoc.get('discountPercentage'),
                discountedPrice:productToAddDoc.get('price')*(1-productToAddDoc.get('discountPercentage')/100),
            }
            cart.totalQuantity+=1;
            cart.totalProducts+=1
            cart.total = cart.total+newItem.discountedPrice;
            cart.products.push(newItem);
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(404).json({ error: 'Error updating cart item' });
    }
}

export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const productId = req.params.productId;
        const cartItem = cart.products.find(item => item.productId === Number(productId));
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        cart.products = cart.products.filter(item => item.productId !== Number(productId));
        cart.totalQuantity=cart.products.reduce((total, item) => total + item.quantity, 0);
        cart.totalProducts=cart.products.length;
        cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(404).json({ error: 'Error deleting cart item' });
    }
}