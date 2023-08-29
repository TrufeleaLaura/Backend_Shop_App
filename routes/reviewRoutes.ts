import express from "express";
import {addReview, deleteReview, getReviewsOfProduct, updateReview} from "../controllers/reviewController.js";


const router = express.Router();

router.route('/:userId/:productId').post(addReview);
router.route('/:userId/:reviewId').delete(deleteReview);
router.route('/:productId').get(getReviewsOfProduct);
router.route('/:userId/:reviewId').put(updateReview);

export default router;