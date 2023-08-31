import {addReturn, getAllReturnsForUser} from "../controllers/returnController.js";
import express from "express";

const router=express.Router();

//these routes are not ok, need to be fixed
router.route('/add-return/:userId/:orderId').post(addReturn);
router.route('/:userId').get(getAllReturnsForUser);

export default router;