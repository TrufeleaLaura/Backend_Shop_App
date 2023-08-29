import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema({
    userId: { type: String, required: true },
    productId: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
});
const ReviewModel = mongoose.model('review', reviewSchema);
export default ReviewModel;
//# sourceMappingURL=review.js.map