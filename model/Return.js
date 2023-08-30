import mongoose, { Schema } from "mongoose";
const returnSchema = new Schema({
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    productsIds: { type: [Number], required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true },
});
const ReturnModel = mongoose.model('return', returnSchema);
export default ReturnModel;
//# sourceMappingURL=Return.js.map