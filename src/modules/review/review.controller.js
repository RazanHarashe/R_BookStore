import orderModel from "../../../db/model/order.model.js";
import reviewModel from "../../../db/model/review.model.js";

export const createReview = async (req, res, next) => {
  const { bookId } = req.params;
  const { comment, rating } = req.body;

  const order = await orderModel.findOne({
    userId: req.user._id,
    status: "deliverd",
    "books.bookId": bookId,
  });
  if (!order) {
    return next(new Error(`can not review this Book`, { cause: 400 }));
  }
  const checkReview = await reviewModel.findOne({
    createdBy: req.user._id,
    bookId: bookId.toString(),
  });
  if (checkReview) {
    return next(new Error(`already review`, { cause: 400 }));
  }
  const review = await reviewModel.create({
    comment,
    rating,
    createdBy: req.user._id,
    orderId: order._id,
    bookId: bookId,
  });

  if (!review) {
    return next(new Error("Error in creating Review", { cause: 400 }));
  }
  return res.status(201).json({ message: "success", review });
};
