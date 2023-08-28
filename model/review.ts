import mongoose, {Schema} from "mongoose";

export interface Review{
    userId:string,
    productId:string,
    rating:number,
    reviewText:string,
    date:String,
    status:String
}

const reviewSchema = new Schema<Review>({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
})

const ReviewModel = mongoose.model<Review>('review', reviewSchema);
export default ReviewModel;