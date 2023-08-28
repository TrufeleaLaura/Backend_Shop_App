import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const productSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String, required: true }],
});
const ProductModel = mongoose.model('product', productSchema);
export default ProductModel;
//# sourceMappingURL=product.js.map