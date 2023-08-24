import express from "express";
import {getUserById, login, logout,  register} from "../controllers/userController.js";

const router=express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
//router.route('/protected').get(protectedRoute);
router.route('/logout').get(logout)
export default router;