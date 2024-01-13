import joi from "joi";

export const createReview = joi.object({
  bookId: joi.string().min(24).max(24).required(),
  comment: joi.string().min(3).max(50).required(),
  rating: joi.number().integer().min(0).max(5).required(),
});
