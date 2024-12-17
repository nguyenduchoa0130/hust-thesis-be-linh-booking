const { TourTransportsModel } = require('../models');

module.exports = {
  getAll: () => {
    return TourTransportsModel.find();
  },
  getOne: (filterQuery) => {
    return TourTransportsModel.findOne(filterQuery);
  },
  getById: (id) => {
    return TourTransportsModel.findById(id);
  },

  create: (payload) => {
    return TourTransportsModel.create(payload);
  },
};
