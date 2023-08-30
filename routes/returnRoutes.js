import { addReturn, getAllReturnsForUser } from "../controllers/returnController.js";
import express from "express";
const router = express.Router();
router.route('/:userId/:orderId').post(addReturn);
router.route('/:userId').get(getAllReturnsForUser);
export default router;
//# sourceMappingURL=returnRoutes.js.map