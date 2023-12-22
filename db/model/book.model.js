import mongoose, { Schema, Types, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true, // delete spaces before and after the word
    },
    slug: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0.0,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
    },
    genreId: {
      type: Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    publishingHouse: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
    },
    inStock: {
      type: Number,
      default: 1,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.models.Book || model("Book", bookSchema);
export default bookModel;
