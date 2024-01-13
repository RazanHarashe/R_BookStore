import { Router } from "express";
import * as bookController from "./books.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./books.endpoint.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
import reviwRouter from "../review/review.router.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./books.validation.js";
const router = Router();
router.use("/:bookId/review", reviwRouter);
router.post(
  "/",
  auth(endPoint.create),
  fileUpload(fileValidation.image).single("image"),
  validation(validator.createBook),
  asyncHandler(bookController.createBook)
);

router.put(
  "/:bookId",
  auth(endPoint.update),
  fileUpload(fileValidation.image).single("image"),
  validation(validator.updateBook),
  asyncHandler(bookController.updateBook)
);

router.get(
  "/:bookId",
  auth(endPoint.specific),
  validation(validator.getBook),
  asyncHandler(bookController.getBook)
);

router.get(
  "/genre/:genreId",
  auth(endPoint.get),
  validation(validator.getBookWithGenre),
  asyncHandler(bookController.getBookWithGenre)
);

router.get(
  "/",
  auth(endPoint.getAll),
  asyncHandler(bookController.getAllBooks)
);

router.delete(
  "/softDelete/:bookId",
  auth(endPoint.delete),
  validation(validator.softDeleteBook),
  asyncHandler(bookController.softDeleteBook)
);

router.delete(
  "/:bookId",
  auth(endPoint.delete),
  validation(validator.deleteBook),
  asyncHandler(bookController.deleteBook)
);
export default router;
