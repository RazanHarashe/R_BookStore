import connectDB from "../../db/connection.js";
import authRouter from "./auth/auth.router.js";
import genreRouter from "./genre/genre.router.js";
import bookRouter from "./books/books.router.js";
import cors from "cors";
const initApp = (app, express) => {
  app.use(express.json());
  connectDB();
  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/genre", genreRouter);
  app.use("/books", bookRouter);

  app.use("*", (req, res) => {
    return res.status(404).json({ message: "page not found" });
  });
};

export default initApp;
