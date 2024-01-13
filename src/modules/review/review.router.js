import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./review.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./review.validation.js";
const router = Router({ mergeParams: true });

router.post(
  "/",
  auth(endPoint.create),
  validation(validator.createReview),
  reviewController.createReview
);

export default router;
