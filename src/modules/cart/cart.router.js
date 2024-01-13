import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./cart.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./cart.validation.js";
const router = Router();

router.post(
  "/",
  auth(endPoint.create),
  validation(validator.createCart),
  cartController.createCart
);
router.get("/", auth(endPoint.getAllBooks), cartController.getCart);
router.patch(
  "/removeBookFromCart",
  auth(endPoint.removeBook),
  validation(validator.removeBookFromCart),
  cartController.removeBookFromCart
);
router.patch("/clear", auth(endPoint.clear), cartController.clearCart);
router.get(
  "/getAllCarts",
  auth(endPoint.getAllCarts),
  cartController.getAllCarts
);
export default router;
