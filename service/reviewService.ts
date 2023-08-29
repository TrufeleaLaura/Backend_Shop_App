import ReviewModel from "../model/review.js";
import OrderModel from "../model/order.js";


export const createReview = async (userId: string, productId: number, rating: number, reviewText: string) => {
    try {
        const orders = await OrderModel.find({userId: userId.trim()});
        let ownsProduct = orders.some(order => {
            return order.products.some(product => {
                if (product.productId === productId) {
                    return true;
                }
            })
        })
        if (!ownsProduct) {
            throw new Error('You have not bought this product');
        }
        const foundReview = await ReviewModel.findOne({userId, productId: productId});
        if (foundReview)
            throw new Error('You have already reviewed this product');
        const newReview = await ReviewModel.create({
            userId,
            productId,
            rating,
            reviewText,
            date: new Date().toISOString().split('T')[0].toString(),
            status: 'New'
        });
        return newReview;
    } catch (error: any) {
        throw error;
    }
}

