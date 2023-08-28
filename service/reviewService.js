import ReviewModel from "../model/review.js";
export const serviceAddReview = async (userId, productId, rating, reviewText) => {
    const currentDate = new Date().toLocaleString(), newReview = await ReviewModel.create({
        userId,
        productId,
        rating,
        reviewText,
        date: currentDate,
        status: 'new'
    });
    return await newReview.save();
};
//# sourceMappingURL=reviewService.js.map