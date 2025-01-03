const { ForgotPassword } = require('../models');

module.exports = {
  getOne: (filterQuery) => {
    return ForgotPassword.findOne(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  create: (payload) => {
    return ForgotPassword.create(payload);
  },
  remove: (filterQuery) => {
    return ForgotPassword.deleteMany(filterQuery);
  }
};
