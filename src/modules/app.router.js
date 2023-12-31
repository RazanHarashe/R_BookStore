import connectDB from "../../db/connection.js";
import authRouter from "./auth/auth.router.js";
import genreRouter from "./genre/genre.router.js";
import bookRouter from "./books/books.router.js";
import cartRouter from "./cart/cart.router.js";
import couponRouter from "./coupon/coupon.router.js";
import orderRouter from "./order/order.router.js";
import reviewRouter from "./review/review.router.js";
import wishsListRouter from "./wishsList/wishsList.router.js";
import cors from "cors";
const initApp = (app, express) => {
  app.use(express.json());
  connectDB();
  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/genre", genreRouter);
  app.use("/books", bookRouter);
  app.use("/cart", cartRouter);
  app.use("/coupon", couponRouter);
  app.use("/order", orderRouter);
  app.use("/review", reviewRouter);
  app.use("/wishsList", wishsListRouter);

  app.use("*", (req, res) => {
    return res.status(404).json({ message: "page not found" });
  });
};

export default initApp;
