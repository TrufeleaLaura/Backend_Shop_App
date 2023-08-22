import express from "express";
import {getUserById} from "../controllers/userController.js";

const router=express.Router();

router.route('/:userId').get(getUserById);

export default router;