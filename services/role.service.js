const { RolesModel } = require('../models');

module.exports = {
  getAll: () => {
    return RolesModel.find().select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
};
