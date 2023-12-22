import mongoose, { Schema, Types, model } from "mongoose";

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
  }
);

const genreModel = mongoose.models.Genre || model("Genre", genreSchema);
export default genreModel;
