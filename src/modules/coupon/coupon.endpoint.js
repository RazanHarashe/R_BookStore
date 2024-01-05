import { roles } from "../../middleware/auth.js";

export const endPoint = {
  create: [roles.Admin],
  get: [roles.User, roles.Admin],
  update: [roles.Admin],
  softDelete: [roles.Admin],
  hardDelete: [roles.Admin],
  restore: [roles.Admin],
};
