import verifyTokenAndRetrieveUser from "../service/userService.js";
import ProductModel from "../model/product.js";
import ReviewModel from "../model/review.js";
import OrderModel from "../model/order.js";
import { serviceAddReview } from "../service/reviewService.js";
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
        const { productId, userId, reviewText, reviewTitle, rating: rating } = req.body, token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!(productId && userId && reviewText && reviewTitle && rating))
            return res.status(404).json({ error: 'Missing fields' });
        const user = await verifyTokenAndRetrieveUser(token, userId), product = await ProductModel.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const orders = await OrderModel.find({ userId: userId.trim() });
        let ownsProduct = orders.some(order => {
            return order.products.some(product => {
                if (product.productId === productId) {
                    return true;
                }
            });
        });
        if (!ownsProduct) {
            res.status(404).json({ error: 'You cannot review a product you have not bought' });
            return;
        }
        const foundReview = await ReviewModel.findOne({ userId, productId: productId });
        if (foundReview)
            return res.status(400).json({ error: 'You have already reviewed this product' });
        const newReview = await serviceAddReview(userId, productId, rating, reviewText);
        res.status(200).json(newReview);
    }
    catch (error) {
        console.error('Error adding review:', error);
        res.status(400).json({ error: 'Error adding review' });
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
        res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting review:', error);
        res.status(400).json({ error: 'Error deleting review' });
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
        console.error('Error fetching reviews:', error);
        res.status(400).json({ error: 'Error fetching reviews' });
    }
};
export const updateReview = async (req, res) => {
    var _a;
    try {
        const userId = req.params.userId, reviewId = req.params.reviewId, token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], { reviewText, rating } = req.body;
        if (!(userId && reviewId && reviewText && rating)) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const user = await verifyTokenAndRetrieveUser(token, userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const reviewToUpdate = await ReviewModel.findOne({ _id: reviewId });
        if (!reviewToUpdate) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (userId !== reviewToUpdate.userId) {
            return res.status(400).json({ error: 'You cannot update a review that is not yours' });
        }
        await ReviewModel.findOneAndUpdate({ _id: reviewId }, { reviewText: reviewText, rating: rating, status: "updated" });
        const updatedReview = await ReviewModel.findOne({ _id: reviewId });
        res.status(200).json(updatedReview);
    }
    catch (error) {
        console.error('Error updating review:', error);
        res.status(400).json({ error: 'Error updating review' });
    }
};
//# sourceMappingURL=reviewController.js.map