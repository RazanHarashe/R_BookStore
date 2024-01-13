import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createBook = joi
  .object({
    title: joi.string().min(3).max(25).required(),
    author: joi.string().min(3).max(25).required(),
    price: joi.number().positive().required(),
    discount: joi.number().positive().min(1),
    genreId: joi.string().required(),
    file: generalFields.file.required(),
    publishingHouse: joi.string().min(3).max(25).required(),
    overview: joi.string().min(2).max(150000),
    inStock: joi.number().integer().required(),
  })
  .required();

export const updateBook = joi.object({
  bookId: joi.string().min(24).max(24).required(),
  genreId: joi.string().required(),
  title: joi.string().min(3).max(25).required(),
  price: joi.number().positive().required(),
  discount: joi.number().positive().min(1),
  file: generalFields.file.required(),
  publishingHouse: joi.string().min(3).max(25).required(),
  overview: joi.string().min(2).max(150000),
  inStock: joi.number().integer().required(),
});

export const getBook = joi.object({
  bookId: joi.string().min(24).max(24).required(),
});

export const getBookWithGenre = joi.object({
  genreId: joi.string().min(24).max(24).required(),
});

export const softDeleteBook = joi.object({
  bookId: joi.string().min(24).max(24).required(),
});

export const deleteBook = joi.object({
  bookId: joi.string().min(24).max(24).required(),
});
