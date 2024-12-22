const { ToursModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return ToursModel.find(filterQuery);
  },
  getOne: (filterQuery) => {
    return ToursModel.findOne(filterQuery);
  },
  create: (payload) => {
    return ToursModel.create(payload);
  },
};
