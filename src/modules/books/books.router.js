import { Router } from "express";
import * as bookController from "./books.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./books.endpoint.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router = Router();

router.post(
  "/",
  auth(endPoint.create),
  fileUpload(fileValidation.image).single("image"),
  asyncHandler(bookController.createBook)
);

router.get(
  "/:bookId",
  auth(endPoint.specific),
  asyncHandler(bookController.getBook)
);

router.get(
  "/genre/:genreId",
  auth(endPoint.get),
  asyncHandler(bookController.getBookWithGenre)
);
export default router;
