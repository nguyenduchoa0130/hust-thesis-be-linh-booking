const { RolesModel } = require('../models');

module.exports = {
  getAll: () => {
    return RolesModel.find();
  },
  getOne: (filterQuery) => {
    return RolesModel.findOne(filterQuery);
  },
};
