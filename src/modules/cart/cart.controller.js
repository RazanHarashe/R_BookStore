import cartModel from "../../../db/model/cart.model.js";

export const createCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  const cart = await cartModel.findOne({ userId: req.user._id });

  if (!cart) {
    const newCart = await cartModel.create({
      userId: req.user._id,
      books: { bookId, quantity },
    });
    return res.status(201).json({ message: "success", newCart });
  }
  let matchedbooks = false;
  for (let i = 0; i < cart.books.length; i++) {
    if (cart.books[i].bookId == bookId) {
      cart.books[i].quantity = quantity;
      matchedbooks = true;
      break;
    }
    if (!matchedbooks) {
      cart.books.push({ bookId, quantity });
    }
  }
  await cart.save();
  return res.status(201).json({ message: "success", cart });
};

export const getCart = async (req, res) => {
    const cart = await cartModel.findOne({ userId: req.user._id });
    return res.status(200).json({ message: "success", cart });
};

export const removeBookFromCart = async (req, res) => {
  const { bookId } = req.body;
  const cart = await cartModel.findOneAndUpdate(
    { userId: req.user._id, "books.bookId": bookId },
    {
      $pull: {
        books: { bookId },
      },
    },
    { new: true }
  );
  if (cart) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(404).json({ message: "Book not found in the cart" });
  }
};

export const clearCart = async (req, res) => {
  const clearCart = await cartModel.updateOne(
    { userId: req.user._id },
    { books: [] }
  );
  return res.status(200).json({ message: "clear sucessfully"});
};

export const getAllCarts = async (req, res) => {
      const carts = await cartModel.find({});
      return res.status(200).json({ message: "success", carts });
  };
