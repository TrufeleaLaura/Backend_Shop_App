import {Request, Response} from 'express';
import UserModel from "../model/user.js";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import {createOrEmptyCartForUser} from "../service/cartService.js";
import verifyToken from "../service/userService.js";
import jsonwebtoken from "jsonwebtoken";

/**
 * The function is for registering a new user
 * @param req : Request ,firstName:String, lastName:String, email:String, password:String, phoneNumber:String, gender:String,
 * birthDate:String,address:String
 * @param res: Response, User: Object
 * @return {Object} User
 * @throws {500} If there's an error while registering the user.
 */
export const register = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password, phoneNumber, gender, birthDate, address} = req.body;
        if (!(firstName && lastName && email && password && phoneNumber && gender && birthDate))
            return res.status(404).json({error: 'Missing fields'});
        const oldUser = await UserModel.findOne({email});
        if (oldUser)
            return res.status(404).json('User already exists');
        const encryptedPassword = await bcrypt.hash(password, 10),
            newUser = await UserModel.create({
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
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({error: 'Error registering user'});
    }
}

/**
 * The function is for logging in a user, if the user is registered.
 * @param req: Request, email:String, password:String
 * @param res: Response, User: Object
 * @return {Object} User
 * @throws {500} If there's an error while logging in the user.
 */
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (!(email && password))
            return res.status(404).json({error: 'Missing fields'});
        const user = await UserModel.findOne({email});
        if (!user)
            return res.status(404).json('User not found');
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {email: email},
                process.env.SECRET_CODE as string,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            await user.save();
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            return res.status(200).json({user: user});
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json('Error logging in user');
    }
}

/**
 * The function logs out a user, if a user is authenticated.
 * @param req: Request
 * @param res: Response
 * @return {Object} Message
 * @throws {401} If the provided token is invalid.
 * @throws {500} If there's an error while logging out the user.
 */
export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token)
        if (!token)
            return res.status(401).json({error: 'Invalid token'});
        const mysecretkey = process.env.SECRET_CODE as string,
            decoded = jwt.verify(token, mysecretkey),
            userEmail = decoded as { email: string },
            user = await UserModel.findOne({email: userEmail.email});
        if (user) {
            const newToken = jwt.sign(
                {email: user.email},
                process.env.SECRET_CODE as string,
                {
                    expiresIn: "5s",
                }
            );
            const updateUser = await UserModel.findOneAndUpdate(
                {email: user.email},
                {token: null},
            );
            return res.status(200).json({message: 'Logged out successfully'});
        }
    } catch (error: any) {
        if (error instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json( 'Invalid token');
        } else {
            console.error('Error logging out user:', error);
            res.status(500).json({error: 'Error logging out user'});
        }
    }
}
