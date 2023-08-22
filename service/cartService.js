import CartModel from "../model/cart.js";
export const createCartForUser = async (userId) => {
    try {
        const cartExists = await CartModel.findOne({ userId });
        if (cartExists) {
            return null;
        }
        const newCart = {
            userId: userId,
            total: 0,
            totalProducts: 0,
            totalQuantity: 0,
            products: []
        };
        await CartModel.create(newCart);
    }
    catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
};
export const modifyCartItem = (cartItem, quantity, cart) => {
    cartItem.quantity += quantity;
    cartItem.total = cartItem.quantity * cartItem.price;
    cartItem.discountedPrice = cartItem.total * (1 - cartItem.discountPercentage / 100);
    cart.totalQuantity = cart.totalQuantity + quantity;
    cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
};
export const addNewCartItem = (productToAddDoc, quantity, cart) => {
    const newItem = {
        productId: productToAddDoc.get('id'),
        quantity: 1,
        total: productToAddDoc.get('price'),
        price: productToAddDoc.get('price'),
        title: productToAddDoc.get('title'),
        thumbnail: productToAddDoc.get('thumbnail'),
        discountPercentage: productToAddDoc.get('discountPercentage'),
        discountedPrice: productToAddDoc.get('price') * (1 - productToAddDoc.get('discountPercentage') / 100),
    };
    cart.totalQuantity += 1;
    cart.totalProducts += 1;
    cart.total = cart.total + newItem.discountedPrice;
    cart.products.push(newItem);
};
