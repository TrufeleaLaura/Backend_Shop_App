import mongoose, {Schema} from "mongoose";

export interface Review{
    userId:string,
    productId:string,
    starRating:number,
    reviewTitle:string,
    reviewText:string,
    date:Date,
}

const reviewSchema = new Schema<Review>({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    starRating: { type: Number, required: true },
    reviewTitle: { type: String, required: true },
    reviewText: { type: String, required: true },
    date: { type: Date, required: true },
})

const ReviewModel = mongoose.model<Review>('review', reviewSchema);
export default ReviewModel;