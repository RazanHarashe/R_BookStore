import wishsListModel from "../../../db/model/wishslist.model.js";

export const addToWishslist = async (req, res) => {
  const { bookId } = req.body;
  const wishslist = await wishsListModel.findOne({ userId: req.user._id });

  if (!wishslist) {
    const newWishslist = await wishsListModel.create({
      userId: req.user._id,
      books: [{ bookId }],
    });
    return res
      .status(201)
      .json({ message: "Book added to wishslist", newWishslist });
  }

  if (wishslist.books.some((item) => item.bookId.equals(bookId))) {
    return res
      .status(400)
      .json({ message: "Book already exists in the wishslist" });
  }
  wishslist.books.push({ bookId });
  await wishslist.save();
  return res
    .status(200)
    .json({ message: "Book added to wishslist", wishslist });
};

export const getWishslist = async (req, res) => {
  const wishslist = await wishsListModel
    .findOne({ userId: req.user._id })
    .populate("books.bookId");

  if (!wishslist) {
    return res.status(404).json({ message: "Wishslist not found" });
  }
  return res.status(200).json({ message: "success", wishslist });
};

// export const removeFromWishslist = async (req, res) => {
//   const { bookId } = req.body;
//   const wishslist = await wishsListModel.findOne({ userId: req.user._id });

//   if (!wishslist) {
//     return res.status(404).json({ message: "Wishslist not found" });
//   }

//  if(wishslist.books = wishslist.books.filter(
//     (item) => !item.bookId.equals(bookId)
//   )){
//   await wishslist.save();
//   return res
//     .status(200)
//     .json({ message: "Book removed from wishslist", wishslist });
//   }
//   return res
//   .status(400)
//   .json({ message: "Book not exists in the wishslist" });

  
// };

export const removeFromWishslist = async (req, res) => {
  const { bookId } = req.body;

  try {
    const wishslist = await wishsListModel.findOneAndUpdate(
      { userId: req.user._id, "books.bookId": bookId },
      {
        $pull: {
          books: { bookId },
        },
      },
      { new: true }
    );
    if (!wishslist) {
      return res.status(404).json({ message: "Book not found in the wishlist" });
    }
    return res.status(200).json({ message: "Book removed from wishlist", wishslist });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};
