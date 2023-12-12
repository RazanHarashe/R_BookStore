import connectDB from "../../db/connection.js";
import authRouter from "./auth/auth.router.js";
const initApp = (app, express) => {
  app.use(express.json());
  connectDB();

  app.use("/auth", authRouter);

  app.get("*", (req, res) => {
    return res.json({ message: "page not found" });
  });
};

export default initApp;
