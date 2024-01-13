const roles = {
  Admin: "Admin",
  User: "User",
};

export const endPoint = {
  getAll: [roles.Admin,roles.User],
  create: [roles.Admin],
  specific: [roles.Admin],
  update: [roles.Admin],
  delete: [roles.Admin],
};
