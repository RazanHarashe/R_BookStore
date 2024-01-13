import joi from "joi";

export const createOrder = joi.object({
  couponName: joi.string().min(3).max(25).required(),
  address: joi.string().min(3).max(25),
  phoneNumber: joi.string().min(10).max(10),
});

export const cancelOrder = joi.object({
  orderId: joi.string().min(24).max(24).required(),
});

export const changeStatus = joi.object({
  orderId: joi.string().min(24).max(24).required(),
  status: joi.string().min(3).max(25).required(),
});
