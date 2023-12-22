import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.Admin],
  specific: [roles.Admin],
  get: [roles.Admin],
};
