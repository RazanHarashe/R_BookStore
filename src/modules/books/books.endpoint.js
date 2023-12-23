import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.Admin],
  update: [roles.Admin],
  specific: [roles.Admin],
  get: [roles.Admin],
  getAll: [roles.Admin],
  delete: [roles.Admin],
};
