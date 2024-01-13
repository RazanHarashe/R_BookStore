import { roles } from "../../middleware/auth.js";

export const endPoint = {
    send: [roles.User,roles.Admin],
    forgot: [roles.User,roles.Admin],
  };