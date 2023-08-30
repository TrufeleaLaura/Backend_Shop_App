import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema({
    userId: { type: String, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: String, required: true },
    deliveryStatus: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    products: [{
            productId: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            total: { type: Number, required: true },
            price: { type: Number, required: true },
            discountPercentage: { type: Number, required: true },
            discountedPrice: { type: Number, required: true },
            status: { type: String, required: true },
        }],
});
const OrderModel = mongoose.model('order', orderSchema);
export default OrderModel;
//# sourceMappingURL=order.js.map