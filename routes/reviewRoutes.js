import express from "express";
import { addReview, deleteReview, getReviewsOfProduct } from "../controllers/reviewController.js";
const router = express.Router();
router.route('/reviews').post(addReview);
router.route('/users/:userId/reviews/:reviewId').delete(deleteReview);
router.route('/products/:productId/reviews').get(getReviewsOfProduct);
export default router;
//# sourceMappingURL=reviewRoutes.js.map