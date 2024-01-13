import joi from "joi";

export const getGenre = joi.object({
  id: joi.string().min(24).max(24).required(),
});

export const createGenres = joi.object({
  name: joi.string().min(3).max(25).required(),
});

export const updateGenre = joi.object({
  id: joi.string().min(24).max(24).required(),
  name: joi.string().min(3).max(25).required(),
  createDate: joi.date().greater("now"),
});

export const deleteGenre = joi.object({
  id: joi.string().min(24).max(24).required(),
});
