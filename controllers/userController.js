import UserModel from "../model/user.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createOrEmptyCartForUser } from "../service/cartService.js";
import jsonwebtoken from "jsonwebtoken";
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId, user = await UserModel.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(404).json({ error: 'Error fetching user' });
    }
};
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, gender, birthDate, address } = req.body;
        if (!(firstName && lastName && email && password && phoneNumber && gender && birthDate))
            return res.status(404).json({ error: 'Missing fields' });
        const oldUser = await UserModel.findOne({ email });
        if (oldUser)
            return res.status(404).json('User already exists');
        const encryptedPassword = await bcrypt.hash(password, 10), newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            phoneNumber,
            gender,
            birthDate,
            address: address || null,
        });
        await createOrEmptyCartForUser(newUser._id.toString());
        res.status(200).json(newUser);
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password))
            return res.status(404).json({ error: 'Missing fields' });
        const user = await UserModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email: email }, process.env.SECRET_CODE, {
                expiresIn: "2h",
            });
            user.token = token;
            await user.save();
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            return res.status(200).json({ user: user });
        }
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user' });
    }
};
export const logout = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        if (!token)
            return res.status(401).json({ error: 'Invalid token' });
        const mysecretkey = "namaste", decoded = jwt.verify(token, mysecretkey), userEmail = decoded, user = await UserModel.findOne({ email: userEmail.email });
        if (user) {
            const newToken = jwt.sign({ email: user.email }, process.env.SECRET_CODE, {
                expiresIn: "5s",
            });
            const updateUser = await UserModel.findOneAndUpdate({ email: user.email }, { token: null });
            return res.status(200).json({ message: 'Logged out successfully' });
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
        }
        else {
            console.error('Error logging out user:', error);
            res.status(500).json({ error: 'Error logging out user' });
        }
    }
};
// export const protectedRoute = async (req: Request, res: Response) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({error: 'Invalid token'});
//         }
//         //const user = await verifyToken(token);
//         //res.json({ message: `Welcome ${user.firstName}! This is a protected route.` });
//     } catch (error:any) {
//         res.status(401).json({ error: error.message });
//     }
// }
