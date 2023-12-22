import { Router } from "express";
import * as genreController from "./genre.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./genre.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router = Router();

router.get(
  "/",
  auth(endPoint.getAll),
  asyncHandler(genreController.getAllGenres)
);

router.post(
  "/",
  auth(endPoint.create),
  asyncHandler(genreController.createGenres)
);

router.get(
  "/:id",
  auth(endPoint.specific),
  asyncHandler(genreController.getGenre)
);

router.put(
  "/:id",
  auth(endPoint.update),
  asyncHandler(genreController.updateGenre)
);

router.delete(
  "/:genreId",
  auth(endPoint.delete),
  asyncHandler(genreController.deleteGenre)
);
export default router;
