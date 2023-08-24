import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";
import CartModel from "../model/cart.js";
const verifyTokenAndRetrieveCart = async (token, userId) => {
    try {
        console.log('token', token);
        if (!token) {
            throw new Error('Invalid token');
        }
        const mySecretKey = process.env.SECRET_CODE, decoded = jwt.verify(token, mySecretKey), userEmail = decoded, user = await UserModel.findOne({ email: userEmail.email });
        if (!user) {
            throw new Error('user not found');
        }
        const userFromRoute = await UserModel.findById(userId.trim());
        if (user.email !== (userFromRoute === null || userFromRoute === void 0 ? void 0 : userFromRoute.email)) {
            throw new Error('Unauthorized access');
        }
        const cart = await CartModel.findOne({ userId: user._id });
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }
    catch (error) {
        throw error;
    }
};
export default verifyTokenAndRetrieveCart;
