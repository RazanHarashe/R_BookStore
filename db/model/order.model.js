import mongoose, { Schema, model, Types } from "mongoose";
const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        name: {
          type: String,
          requierd: true,
        },
        bookId: {
          type: Types.ObjectId,
          ref: "book",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          required: true,
        },
        finalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    finalPrice: {
      type: Number,
      required: true,
    },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    couponId: {
      type: Types.ObjectId,
      ref: "Coupon",
    },
    couponName: {
      type: String,
    },
    paymentType: {
      type: String,
      default: "cash",
      enum: ["card", "cash"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "cancelled", "confirmed", "onWay", "deliverd"],
    },
    reasonRejected: String,
    note: String,
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const orderModel = mongoose.models.Order || model("Order", orderSchema);
export default orderModel;
