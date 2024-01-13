import { Router } from "express";
import * as orderController from "./order.controller.js";
import { endPoint } from "./order.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./order.validation.js";
const router = Router();
router.post(
  "/",
  auth(endPoint.create),
  validation(validator.createOrder),
  orderController.createOrder
);
router.get("/", auth(endPoint.get), orderController.getOrders);
router.patch(
  "/cancel/:orderId",
  auth(endPoint.cancel),
  validation(validator.cancelOrder),
  orderController.cancelOrder
);
router.patch(
  "/changeStatus/:orderId",
  auth(endPoint.changeStatus),
  validation(validator.changeStatus),
  orderController.changeStatus
);
export default router;
