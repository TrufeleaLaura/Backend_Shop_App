import verifyTokenAndRetrieveUser from "../service/userService.js";
import ProductModel from "../model/product.js";
import ReviewModel from "../model/review.js";
import { createReview } from "../service/reviewService.js";
/**
 * The function adds a new review for a product if the user is authenticated and has bought the product.
 * @param req Request, productId: String, userId: String, reviewText: String, reviewTitle: String, rating: Number
 * @param res Response, Review: Object
 * @return {Object} The newly added review.
 * @throws {400} If there's an error while adding the review.
 */
export const addReview = async (req, res) => {
    var _a;
    try {
        const { reviewText, rating: rating } = req.body, token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], productId = req.params.productId, userId = req.params.userId;
        if (!(productId && userId && reviewText && rating))
            return res.status(404).json({ error: 'Missing fields' });
        const user = await verifyTokenAndRetrieveUser(token, userId), product = await ProductModel.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newReview = await createReview(userId, Number(productId), rating, reviewText);
        const reviewsForProduct = await ReviewModel.find({ productId: productId });
        res.status(200).json(reviewsForProduct);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
/**
 * The function deletes a review if the user is authenticated and the review is his.
 * @param req Request, userId: String, reviewId: String
 * @param res Response
 * @return {Object} Message
 * @throws {400} If there's an error while deleting the review.
 */
export const deleteReview = async (req, res) => {
    var _a;
    try {
        const userId = req.params.userId, reviewId = req.params.reviewId, token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!(userId && reviewId))
            return res.status(404).json({ error: 'Missing fields' });
        const user = await verifyTokenAndRetrieveUser(token, userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const reviewToDelete = await ReviewModel.findOne({ _id: reviewId });
        if (!reviewToDelete)
            return res.status(404).json({ error: 'Review not found' });
        if (userId !== reviewToDelete.userId)
            return res.status(400).json({ error: 'You cannot delete a review that is not yours' });
        await ReviewModel.deleteOne({ _id: reviewId });
        const reviewsForProduct = await ReviewModel.find({ productId: reviewToDelete.productId });
        res.status(200).json(reviewsForProduct);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
/**
 * The function fetches all the reviews of a product.
 * @param req Request, productId: String
 * @param res Response, reviews: Array
 * @return {Object} Array of reviews.
 * @throws {400} If there's an error while fetching the reviews.
 */
export const getReviewsOfProduct = async (req, res) => {
    try {
        const productId = req.params.productId, product = await ProductModel.findOne({ id: productId });
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        const reviews = await ReviewModel.find({ productId: productId });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching reviews' });
    }
};
export const updateReview = async (req, res) => {
    var _a;
    try {
        const userId = req.params.userId, reviewId = req.params.reviewId, token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], { reviewText, rating } = req.body;
        if (!(userId && reviewId && reviewText && rating)) {
            return res.status(400).json('Missing fields');
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json('Rating must be between 1 and 5');
        }
        const user = await verifyTokenAndRetrieveUser(token, userId);
        if (!user) {
            return res.status(404).json('User not found');
        }
        const reviewToUpdate = await ReviewModel.findOne({ _id: reviewId });
        if (!reviewToUpdate) {
            return res.status(404).json('Review not found');
        }
        if (userId !== reviewToUpdate.userId) {
            return res.status(400).json({ error: 'You cannot update a review that is not yours' });
        }
        await ReviewModel.findOneAndUpdate({ _id: reviewId }, {
            reviewText: reviewText,
            rating: rating,
            status: "Updated"
        });
        const reviewsForProduct = await ReviewModel.find({ productId: reviewToUpdate.productId });
        res.status(200).json(reviewsForProduct);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating review' });
    }
};
//# sourceMappingURL=reviewController.js.map