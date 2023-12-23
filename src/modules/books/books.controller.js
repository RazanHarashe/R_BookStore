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

export const updateBook = async (req, res, next) => {
  const { bookId } = req.params;
  const updatedbook = req.body;
  const book = await bookModel.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: `invalid book id ${bookId}` });
  }
  if (updatedbook.genreId) {
    const checkGenre = await genreModel.findById(updatedbook.genreId);
    if (!checkGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }
  }
  if (updatedbook.title) {
    if (
      await bookModel
        .findOne({ title: updatedbook.title, _id: { $ne: book._id } })
        .select("title")
    ) {
      return next(
        new Error(`book ${updatedbook.title} already exist`, { cause: 409 })
      );
    }
    book.title = updatedbook.title;
    book.slug = slugify(updatedbook.title);
  }
  if (updatedbook.price !== undefined) {
    book.price = updatedbook.price;
  }
  if (updatedbook.discount !== undefined) {
    book.discount = updatedbook.discount;
    book.finalPrice =
      book.price - ((book.price * updatedbook.discount) / 100).toFixed(2);
  }
  if (updatedbook.genreId) {
    book.genreId = updatedbook.genreId;
  }
  if (updatedbook.publicationDate) {
    book.publicationDate = updatedbook.publicationDate;
  }
  if (updatedbook.publishingHouse) {
    book.publishingHouse = updatedbook.publishingHouse;
  }
  if (updatedbook.inStock) {
    book.inStock = updatedbook.inStock;
  }
  if (updatedbook.overview) {
    book.overview = updatedbook.overview;
  }

  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/book/${req.body.name}/image` }
    );
    book.image = { secure_url, public_id };
  }
  book.updatedBy = req.user._id;
  const updatedBook = await book.save();
  return res.status(200).json({ message: "Successfully updated", updatedBook });
};

export const getAllBooks = async (req, res) => {
  const books = await bookModel.find({ isDelete: false });
  return res.status(200).json({ message: "Success", books });
};

export const getBook = async (req, res) => {
  const book = await bookModel.findById(req.params.bookId);
  return res.status(200).json({ message: "success", book });
};

export const getBookWithGenre = async (req, res) => {
  const book = await bookModel.find({ genreId: req.params.genreId });
  return res.status(200).json({ message: "success", book });
};

export const softDeleteBook = async (req, res, next) => {
  const { bookId } = req.params;
  const book = await bookModel.findById(bookId);
  if (!book) {
    return next(new Error(`Book not found`, { cause: 404 }));
  }

  book.isDelete = true;
  book.updatedBy = req.user._id;

  await book.save();
  return res.status(200).json({ message: "Successfully deleted" });
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const book = await bookModel.findByIdAndDelete(bookId);
  if (!book) {
    return next(new Error(`Book not found`, { cause: 404 }));
  }
  return res.status(200).json({ message: "Successfully deleted" });
};
