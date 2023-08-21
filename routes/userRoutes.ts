import express from "express";
import {getUserById} from "../controllers/userController.js";

const router=express.Router();

router.route('/').get(getUserById);

export default router;