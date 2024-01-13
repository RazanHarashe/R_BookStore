import joi from "joi";

export const addToWishslist = joi.object({
  bookId: joi.string().min(24).max(24).required(),
});

export const removeFromWishslist = joi.object({
  bookId: joi.string().min(24).max(24).required(),
});
