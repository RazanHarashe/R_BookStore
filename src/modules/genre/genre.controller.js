import slugify from "slugify";
import genreModel from "../../../db/model/genre.model.js";

export const getAllGenres = async (req, res) => {
  const genres = await genreModel.find();
  return res.status(200).json({ message: "success", genres });
};

export const getGenre = async (req, res, next) => {
  const { id } = req.params;
  const genre = await genreModel.findById(id);
  if (!genre) {
    return next(new Error(`genre not found`, { cause: 409 }));
  }
  return res.status(200).json({ message: "success", genre });
};

export const createGenres = async (req, res) => {
  try {
    const name = req.body.name.toLowerCase();
    if (!name) {
      return res
        .status(400)
        .json({ message: "Name is required in the request body" });
    }
    const genre = await genreModel.findOne({ name });
    if (genre) {
      return res.status(409).json({ message: "Genre name already exists" });
    }
    const newGenre = await genreModel.create({
      name,
      slug: slugify(name),
      createdBy: req.user._id,
      updateBy: req.user._id,
    });
    return res.status(200).json({ message: "success", newGenre });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateGenre = async (req, res, next) => {
  const genre = await genreModel.findById(req.params.id);
  if (!genre) {
    return res
      .status(404)
      .json({ message: `invalid genre id ${req.params.id}` });
  }
  if (!req.body.name && !req.body.createDate) {
    return res.status(400).json({ message: "No updates" });
  }
  if (req.body.name && req.body.name !== genre.name) {
    const existingGenre = await genreModel
      .findOne({ name: req.body.name, _id: { $ne: genre._id } })
      .select("name");

    if (existingGenre) {
      return res
        .status(409)
        .json({ message: `Genre ${req.body.name} already exists` });
    }
    genre.name = req.body.name;
    genre.slug = slugify(req.body.name);
    genre.createDate = req.body.createDate;
  }
  if (req.body.createDate && req.body.createDate !== genre.createDate) {
    genre.createDate = req.body.createDate;
  }
  if (genre.isModified()) {
    genre.updateBy = req.user._id;
    const result = await genre.save();
    return res.status(200).json({ message: "Success", result });
  } else {
    return res.status(200).json({ message: "No updates" });
  }
};

export const deleteGenre = async (req, res, next) => {
  const { genreId } = req.params;
  const genre = await genreModel.findByIdAndDelete(genreId);
  if (!genre) {
    return next(new Error(`Genre not found`, { cause: 404 }));
  }
  return res.status(200).json({ message: "success" });
};