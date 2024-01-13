import { Router } from "express";
import * as genreController from "./genre.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./genre.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./genre.validation.js";
const router = Router();

router.get(
  "/",
  auth(endPoint.getAll),
  asyncHandler(genreController.getAllGenres)
);

router.post(
  "/",
  auth(endPoint.create),
  validation(validator.createGenres),
  asyncHandler(genreController.createGenres)
);

router.get(
  "/:id",
  auth(endPoint.specific),
  validation(validator.getGenre),
  asyncHandler(genreController.getGenre)
);

router.put(
  "/:id",
  auth(endPoint.update),
  validation(validator.updateGenre),
  asyncHandler(genreController.updateGenre)
);

router.delete(
  "/:genreId",
  auth(endPoint.delete),
  validation(validator.deleteGenre),
  asyncHandler(genreController.deleteGenre)
);
export default router;
