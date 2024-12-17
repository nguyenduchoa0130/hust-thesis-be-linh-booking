const { RolesModel } = require('../models');

module.exports = {
  getAll: () => {
    return RolesModel.find().select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  getOne: (filterQuery) => {
    return RolesModel.findOne(filterQuery).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
};
