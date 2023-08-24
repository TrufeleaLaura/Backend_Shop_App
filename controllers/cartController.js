import jsonwebtoken from "jsonwebtoken";
import ProductModel from "../model/product.js";
import { addNewCartItem, modifyCartItem } from "../service/cartService.js";
import verifyTokenAndRetrieveCart from "../service/userService.js";
export const getCartByUserId = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], userId = req.params.userId;
        const cart = await verifyTokenAndRetrieveCart(token, userId);
        res.status(200).json(cart);
    }
    catch (error) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
        }
        else {
            console.error('Error fetching cart by userId:', error);
            res.status(400).json({ error: error.message });
        }
    }
};
export const updateCartItem = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], userId = req.params.userId, cart = await verifyTokenAndRetrieveCart(token, userId), { productId, quantity } = req.body, cartItem = cart.products.find(item => item.productId === productId);
        if (cartItem) {
            modifyCartItem(cartItem, quantity, cart);
        }
        else {
            const productToAddDoc = await ProductModel.findOne({ id: productId });
            if (!productToAddDoc) {
                return res.status(404).json({ error: 'Product not found' });
            }
            addNewCartItem(productToAddDoc, quantity, cart);
        }
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error updating cart item:', error);
        res.status(400).json({ error: error.message });
    }
};
export const deleteCartItem = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], userId = req.params.userId;
        const cart = await verifyTokenAndRetrieveCart(token, userId), productId = req.params.productId, cartItem = cart.products.find(item => item.productId === Number(productId));
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        cart.products = cart.products.filter(item => item.productId !== Number(productId));
        cart.totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
        cart.totalProducts = cart.products.length;
        cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
        await cart.save();
        return res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
