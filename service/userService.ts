import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";
import CartModel from "../model/cart.js";

/**
 * The function verifies the token and retrieves the user.
 * @param token: String
 * @param userId: String
 * @return {Object} User
 * @throws {Error} If there's an error while verifying the token or retrieving the user.
 */
const verifyTokenAndRetrieveUser = async (token: any, userId: string) => {
    try {
        console.log('token', token)
        if (!token) {
            throw new Error('Invalid token');
        }
        const mySecretKey = process.env.SECRET_CODE as string,
            decoded = jwt.verify(token, mySecretKey),
            userEmail = decoded as { email: string },
            user = await UserModel.findOne({email: userEmail.email});
        if (!user) {
            throw new Error('user not found');
        }
        const userFromRoute = await UserModel.findById(userId.trim());
        if (user.email !== userFromRoute?.email) {
            throw new Error('Unauthorized access');
        }
        return user;
    } catch (error: any) {
        throw error;

    }
};


export default verifyTokenAndRetrieveUser;
