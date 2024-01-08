import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.User],
  get: [roles.User],
  cancel: [roles.User],
  changeStatus: [roles.Admin],
};
