import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./cart.endpoint.js";
const router = Router();

router.post("/", auth(endPoint.create), cartController.createCart);
router.get("/", auth(endPoint.getAllBooks), cartController.getCart);
router.patch(
  "/removeBookFromCart",
  auth(endPoint.removeBook),
  cartController.removeBookFromCart
);
router.patch("/clear", auth(endPoint.clear), cartController.clearCart);
router.get(
  "/getAllCarts",
  auth(endPoint.getAllCarts),
  cartController.getAllCarts
);
export default router;
