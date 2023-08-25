import CartModel, {Cart, CartItem} from "../model/cart.js";

/**
 * The function create a cart for a user, if the user registered for the first time
 * or returns the empty cart if the user already has one.
 * @param userId: String
 * @return {Object} Cart, null if there's an error, or {void} if the cart already exists.
 * @throws {Error} If there's an error while creating the cart.
 */
export const createOrEmptyCartForUser = async (userId: String) => {
    try {
        const cartExists = await CartModel.findOne({ userId });
        if (cartExists) {
            cartExists.products = [];
            cartExists.total = 0;
            cartExists.totalProducts = 0;
            cartExists.totalQuantity = 0;
            await cartExists.save();
            return cartExists;
        }
        else {
            const newCart: Cart = {
                userId: userId,
                total: 0,
                totalProducts: 0,
                totalQuantity: 0,
                products: []
            };
            await CartModel.create(newCart);
        }
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
};

/**
 * The function updates the content of the cart  for a user, if the user is authenticated.
 * @param cartItem: CartItem
 * @param quantity: Number
 * @param cart: Cart
 * @return {void}
 */
export const modifyCartItem = (cartItem: CartItem, quantity: number, cart: Cart) => {
    cartItem.quantity += quantity;
    cartItem.total = cartItem.quantity * cartItem.price;
    cartItem.discountedPrice = cartItem.total * (1 - cartItem.discountPercentage / 100);
    cart.totalQuantity = cart.totalQuantity + quantity;
    cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
}

/**
 * The function adds a new cart item to the cart for a user and update the cart content
 * @param productToAddDoc: CartItem
 * @param quantity: Number
 * @param cart: Cart
 */
export const addNewCartItem = (productToAddDoc:any, quantity: number, cart: Cart) => {
    const newItem: CartItem = {
        productId: productToAddDoc.get('id'),
        quantity: 1,
        total: productToAddDoc.get('price'),
        price: productToAddDoc.get('price'),
        title: productToAddDoc.get('title'),
        thumbnail: productToAddDoc.get('thumbnail'),
        discountPercentage: productToAddDoc.get('discountPercentage'),
        discountedPrice: productToAddDoc.get('price') * (1 - productToAddDoc.get('discountPercentage') / 100),
    }
    cart.totalQuantity += 1;
    cart.totalProducts += 1
    cart.total = cart.total + newItem.discountedPrice;
    cart.products.push(newItem);
}


