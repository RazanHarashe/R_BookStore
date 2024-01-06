import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./review.endpoint.js";
const router = Router({ mergeParams: true });

router.post("/", auth(endPoint.create), reviewController.createReview);

export default router;
