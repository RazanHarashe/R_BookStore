import mongoose, { Schema, Types, model } from "mongoose";

const wishsListSchema = new Schema(
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
          ref: "Book",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const wishsListModel =
  mongoose.models.Wishslist || model("Wishslist", wishsListSchema);
export default wishsListModel;
