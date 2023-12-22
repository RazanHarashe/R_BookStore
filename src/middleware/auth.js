import jwt from "jsonwebtoken";
import userModel from "../../db/model/user.model.js";

export const roles = {
  Admin: "Admin",
  User: "User",
};

export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARERKEY)) {
      res.status(400).json({ message: "Invalid authorization" });
    }
    const token = authorization.split(process.env.BEARERKEY)[1];
    const decoded = jwt.verify(token, process.env.LOGINSECRET);
    if (!decoded) {
      res.status(400).json({ message: "Invalid authorization" });
    }
    const user = await userModel
      .findById(decoded.id)
      .select("userName role changePasswordTime");
    if (!user) {
      return res.status(404).json({ message: "not registerd user" });
    }
    if (!accessRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: `${user.userName} not auth user` });
    }
    if (parseInt(user.changePasswordTime?.getTime() / 1000) > decoded.iat) {
      return next(new Error(`expired token plz login`, { cause: 400 }));
    }
    req.user = user;
    next();
  };
};
