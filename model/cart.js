import mongoose, { Schema } from 'mongoose';
const cartSchema = new Schema({
    userId: { type: String, required: true },
    total: { type: Number, required: true },
    totalProducts: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    products: [{
            productId: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            total: { type: Number, required: true },
            price: { type: Number, required: true },
            discountPercentage: { type: Number, required: true },
            discountedPrice: { type: Number, required: true },
        }]
});
const CartModel = mongoose.model('cart', cartSchema);
export default CartModel;
// [{"id": 1,
//     "products": [
//     {
//         "productId": 59,
//
//         "thumbnail":"https://i.dummyjson.com/data/products/59/thumbnail.jpg",
//         "title": "Spring and summershoes",
//         "price": 20,
//         "quantity": 3,
//         "total": 60,
//         "discountPercentage": 8.71,
//         "discountedPrice": 55
//     },
//     {
//         "productId": 88,
//         "thumbnail":"https://i.dummyjson.com/data/products/88/thumbnail.jpg",
//         "title": "TC Reusable Silicone Magic Washing Gloves",
//         "price": 29,
//         "quantity": 2,
//         "total": 58,
//         "discountPercentage": 3.19,
//         "discountedPrice": 56
//     },
//     {
//         "productId": 18,
//         "title": "Oil Free Moisturizer 100ml",
//         "thumbnail":"https://i.dummyjson.com/data/products/18/thumbnail.jpg",
//         "price": 40,
//         "quantity": 2,
//         "total": 80,
//         "discountPercentage": 13.1,
//         "discountedPrice": 70
//     },
//     {
//         "productId": 95,
//         "title": "Wholesale cargo lashing Belt",
//         "thumbnail":"https://i.dummyjson.com/data/products/95/thumbnail.jpg",
//         "price": 930,
//         "quantity": 1,
//         "total": 930,
//         "discountPercentage": 17.67,
//         "discountedPrice": 766
//     },
//     {
//         "productId": 39,
//         "title": "Women Sweaters Wool",
//         "thumbnail":"https://i.dummyjson.com/data/products/39/thumbnail.jpg",
//         "price": 600,
//         "quantity": 2,
//         "total": 1200,
//         "discountPercentage": 17.2,
//         "discountedPrice": 994
//     }
// ],
//     "total": 2328,
//     "discountedTotal": 1941,
//     "userId": 1,
//     "totalProducts": 5,
//     "totalQuantity": 10}]
//
