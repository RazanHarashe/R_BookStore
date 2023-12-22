import slugify from "slugify";
import genreModel from "../../../db/model/genre.model.js";
import cloudinary from "../../services/cloudinary.js";
import bookModel from "../../../db/model/book.model.js";

export const createBook = async (req, res) => {
  const { title, price, discount, genreId } = req.body;
  const checkGenre = await genreModel.findById(genreId);
  if (!checkGenre) {
    return res.status(404).json("Genre not found");
  }

  req.body.slug = slugify(title);
  req.body.finalPrice = price - ((price * (discount || 0)) / 100).toFixed(2);

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/book/${req.body.name}/image` }
  );
  req.body.image = { secure_url, public_id };
  req.body.createdBy = req.user._id;
  req.body.updatedBy = req.user._id;

  const book = await bookModel.create(req.body);
  if (!book) {
    return res.status(400).json({ message: "error while creating book" });
  }
  return res.status(200).json({ message: "successfully created", book });
};

export const getBook = async (req, res) => {
  const book = await bookModel.findById(req.params.bookId);
  return res.status(200).json({ message: "success", book });
};

export const getBookWithGenre = async (req, res) => {
  const book = await bookModel.find({ genreId: req.params.genreId });
  return res.status(200).json({ message: "success", book });
};
