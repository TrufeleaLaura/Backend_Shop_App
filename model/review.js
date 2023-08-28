import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    starRating: { type: Number, required: true },
    reviewTitle: { type: String, required: true },
    reviewText: { type: String, required: true },
    date: { type: Date, required: true },
});
const ReviewModel = mongoose.model('review', reviewSchema);
export default ReviewModel;
//# sourceMappingURL=review.js.map