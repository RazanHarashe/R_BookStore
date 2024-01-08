import bookModel from "../../../db/model/book.model.js";
import cartModel from "../../../db/model/cart.model.js";
import couponModel from "../../../db/model/coupon.model.js";
import orderModel from "../../../db/model/order.model.js";
import userModel from "../../../db/model/user.model.js";

export const createOrder = async (req, res, next) => {
  const { couponName } = req.body;
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new Error(`cart is empty`, { cause: 400 }));
  }
  req.body.books = cart.books;
  if (couponName) {
    const coupon = await couponModel.findOne({ name: couponName });
    if (!coupon) {
      return next(new Error(`coupon not found`, { cause: 404 }));
    }

    const currentDate = new Date();
    if (coupon.expireDate <= currentDate) {
      return next(new Error(`Coupon has expired`, { cause: 400 }));
    }

    if (coupon.usedBy.includes(req.user._id)) {
      return next(new Error(`coupon already used`, { cause: 409 }));
    }
    req.body.coupon = coupon;
  }
  let subTotals = 0;
  let finalbookList = [];
  for (let book of req.body.books) {
    const checkbook = await bookModel.findOne({
      _id: book.bookId,
      inStock: { $gte: book.quantity },
    });
    if (!checkbook) {
      return next(new Error("book quantity not available", { cause: 403 }));
    }
    book = book.toObject();
    book.title = checkbook.title;
    book.price = checkbook.price;
    book.discount = checkbook.discount;
    book.finalPrice = book.quantity * checkbook.finalPrice;
    subTotals += book.finalPrice;
    finalbookList.push(book);
  }
  const user = await userModel.findById(req.user._id);
  if (!req.body.address) {
    req.body.address = user.address;
  }
  if (!req.body.phone) {
    req.body.phone = user.phone;
  }
  const order = await orderModel.create({
    userId: req.user._id,
    books: finalbookList,
    finalPrice: subTotals - (subTotals * (req.body.coupon?.amount || 0)) / 100,
    address: req.body.address,
    phoneNumber: req.body.phone,
    couponName: req.body.couponName ?? "",
  });

  for (const book of req.body.books) {
    await bookModel.updateOne(
      { _id: book.bookId },
      { $inc: { instock: -book.quantity } }
    );
  }

  if (req.body.coupon) {
    await couponModel.updateOne(
      { _id: req.body.coupon._id },
      { $addToSet: { usedBy: req.user._id } }
    );
  }
  await cartModel.updateOne(
    { userId: req.user._id },
    {
      books: [],
    }
  );
  return res.status(201).json({ message: "success", order });
};

export const getOrders = async (req, res, next) => {
  const orders = await orderModel.find({ userId: req.user._id });
  return res.status(200).json({ message: "success", orders });
};

export const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findOne({
    _id: orderId,
    userId: req.user._id,
  });
  if (!order) {
    return next(new Error("invalid order", { code: 404 }));
  }
  if (order.status != "pending") {
    return next(new Error(`can't cancel this order`, { code: 406 }));
  }
  req.body.status = "cancelled";
  req.body.updatedBy = req.user._id;
  const newOrder = await orderModel.findByIdAndUpdate(orderId, req.body, {
    new: true,
  });

  for (const book of order.books) {
    await bookModel.updateOne(
      { _id: book.booktId },
      { $inc: { stock: book.quantity } }
    );
  }

  if (req.body.coupon) {
    await couponModel.updateOne(
      { _id: req.body.coupon._id },
      { $pull: { usedBy: req.user_id } }
    );
  }
  return res.json({ message: "success", newOrder });
};

export const changeStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await orderModel.findById(orderId);
  if (!order) {
    return next(new Error("order not found", { code: 404 }));
  }
  if (order.status == "cancelled" || order.status == "deliverd") {
    return next(new Error("can't cancel this order"));
  }

  const newOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { status: req.body.status },
    { new: true }
  );

  if (req.body.status == "cancelled")
    for (const book of order.books) {
      await bookModel.updateOne(
        { _id: book.bookId },
        { $inc: { stock: book.quantity } }
      );
    }

  if (order.couponName) {
    await couponModel.updateOne(
      { name: order.couponName },
      { $pull: { usedBy: order.userId } }
    );
  }

  return res.json({ message: "success", order: newOrder });
};
