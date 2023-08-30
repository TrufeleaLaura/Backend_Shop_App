import mongoose, {Schema} from "mongoose";

export interface Return{
    userId:string,
    orderId:string,
    productsIds:number[],
    reason:string,
    date:string
}

const returnSchema = new Schema<Return>({
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    productsIds: { type: [Number], required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true },
    });

const ReturnModel = mongoose.model<Return>('return', returnSchema);
export default ReturnModel;