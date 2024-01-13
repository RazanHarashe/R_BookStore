import { Router } from "express";
import * as wishslistController from "./wishsList.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./wishsList.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./wishsList.validation.js";
const router = Router();
router.post(
  "/",
  auth(endPoint.add),
  validation(validator.addToWishslist),
  wishslistController.addToWishslist
);
router.get("/", auth(endPoint.get), wishslistController.getWishslist);
router.delete(
  "/removeFromWishslist",
  auth(endPoint.remove),
  validation(validator.removeFromWishslist),
  wishslistController.removeFromWishslist
);

export default router;
