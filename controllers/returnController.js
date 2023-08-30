import verifyTokenAndRetrieveUser from "../service/userService.js";
import { createReturn } from "../service/returnService.js";
import ReturnModel from "../model/Return.js";
export const addReturn = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], userId = req.params.userId, user = await verifyTokenAndRetrieveUser(token, userId), orderId = req.params.orderId, productsIds = req.body.productsIds, reason = req.body.reason;
        if (!(userId && orderId && productsIds && reason))
            return res.status(404).json('Missing fields');
        const newReturn = await createReturn(userId, orderId, productsIds, reason);
        res.status(200).json(newReturn);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
export const getAllReturnsForUser = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1], userId = req.params.userId, user = await verifyTokenAndRetrieveUser(token, userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const returns = await ReturnModel.find({ userId: userId });
        res.status(200).json(returns);
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
//# sourceMappingURL=returnController.js.map