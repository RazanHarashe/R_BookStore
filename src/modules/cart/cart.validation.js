import joi from "joi";

export const createCart = joi.object({
  bookId: joi.string().min(24).max(24).required(),
  quantity: joi.number().integer().positive(),
});

export const removeBookFromCart = joi.object({
  bookId: joi.string().min(24).max(24).required(),
});
