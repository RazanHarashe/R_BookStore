import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.User],
  getAllBooks: [roles.User],
  removeBook: [roles.User],
  clear:[roles.User],
  getAllCarts:[roles.Admin],
};
