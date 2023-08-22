import CartModel from "../model/cart.js";
import ProductModel from "../model/product.js";
import { addNewCartItem, modifyCartItem } from "../service/cartService.js";
export const getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error fetching cart by userId:', error);
        res.status(400).json({ error: 'Error fetching cart by userId' });
    }
};
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const { productId, quantity } = req.body;
        const cartItem = cart.products.find(item => item.productId === productId);
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
        res.status(400).json({ error: 'Error updating cart item' });
    }
};
export const deleteCartItem = async (req, res) => {
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
        cart.totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0);
        cart.totalProducts = cart.products.length;
        cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(404).json({ error: 'Error deleting cart item' });
    }
};
