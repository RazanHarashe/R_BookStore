import connectDB from "../../db/connection.js";
import authRouter from "./auth/auth.router.js";
import genreRouter from "./genre/genre.router.js";
import bookRouter from "./books/books.router.js";
const initApp = (app, express) => {
  app.use(express.json());
  connectDB();

  app.use("/auth", authRouter);
  app.use("/genre", genreRouter);
  app.use("/books", bookRouter);

  app.get("*", (req, res) => {
    return res.json({ message: "page not found" });
  });
};

export default initApp;
