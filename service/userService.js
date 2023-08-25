import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";
const verifyTokenAndRetrieveUser = async (token, userId) => {
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
        return user;
    }
    catch (error) {
        throw error;
    }
};
export default verifyTokenAndRetrieveUser;
