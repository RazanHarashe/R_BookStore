import { Router } from "express";
import * as couponController from "./coupon.controller.js";
import * as validatores from "./coupon.validation.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./coupon.endpoint.js";
const router = Router();

router.post(
  "/",
  auth(endPoint.create),
  validation(validatores.createCoupon),
  couponController.createCoupon
);
router.get("/", auth(endPoint.get), couponController.getCoupons);
router.put("/:id", auth(endPoint.update), couponController.updateCoupon);
router.patch(
  "/softDelete/:id",
  auth(endPoint.softDelete),
  couponController.softDelete
);
router.delete(
  "/hardDelete/:id",
  auth(endPoint.hardDelete),
  couponController.hardDelete
);
router.patch("/restore/:id", auth(endPoint.restore), couponController.restore);

export default router;
