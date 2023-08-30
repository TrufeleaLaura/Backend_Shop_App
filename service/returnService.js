import OrderModel from "../model/order.js";
import ReturnModel from "../model/Return.js";
export const createReturn = async (userId, orderId, productsIds, reason) => {
    try {
        const order = await OrderModel.findOne({ _id: orderId, userId });
        if (!order || order.userId !== userId) {
            throw new Error('Order not found');
        }
        for (const product of order.products) {
            if (productsIds.includes(product.productId)) {
                product.status = "Returned";
            }
        }
        await order.save();
        const newReturn = await ReturnModel.create({
            userId,
            orderId,
            productsIds,
            reason,
            date: new Date().toISOString().split('T')[0].toString(),
        });
        return newReturn;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=returnService.js.map