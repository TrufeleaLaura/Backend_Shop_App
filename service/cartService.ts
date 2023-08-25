import CartModel, {Cart, CartItem} from "../model/cart.js";


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

export const modifyCartItem = (cartItem: CartItem, quantity: number, cart: Cart) => {
    cartItem.quantity += quantity;
    cartItem.total = cartItem.quantity * cartItem.price;
    cartItem.discountedPrice = cartItem.total * (1 - cartItem.discountPercentage / 100);
    cart.totalQuantity = cart.totalQuantity + quantity;
    cart.total = cart.products.reduce((total, item) => total + item.discountedPrice, 0);
}

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


