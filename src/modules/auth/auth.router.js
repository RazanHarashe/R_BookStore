import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./auth.endpoint.js";
const router = Router();

router.post(
  "/signup",
  fileUpload(fileValidation.image).single("image"),
  asyncHandler(AuthController.signUp)
);
router.post("/signin", asyncHandler(AuthController.signIn));
router.get("/confirmEmail/:token", asyncHandler(AuthController.confirmEmail));
router.patch("/sendCode",auth(endPoint.send), asyncHandler(AuthController.sendCode));
router.patch("/forgotPassword",auth(endPoint.forgot), asyncHandler(AuthController.forgotPassword));

export default router;
