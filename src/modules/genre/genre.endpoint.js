const roles = {
  Admin: "Admin",
  User: "User",
};

export const endPoint = {
  getAll: [roles.Admin],
  create: [roles.Admin],
  specific: [roles.Admin],
  update: [roles.Admin],
  delete: [roles.Admin],
};
