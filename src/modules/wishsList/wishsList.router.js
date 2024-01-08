import { Router } from "express";
import * as wishslistController from "./wishsList.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./wishsList.endpoint.js";
const router = Router();
router.post("/", auth(endPoint.add), wishslistController.addToWishslist);
router.get("/", auth(endPoint.get), wishslistController.getWishslist);
router.delete(
  "/removeFromWishslist",
  auth(endPoint.remove),
  wishslistController.removeFromWishslist
);

export default router;
