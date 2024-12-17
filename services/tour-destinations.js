const { TourDestinationsModel } = require('../models');

module.exports = {
  getAll: () => {
    return TourDestinationsModel.find();
  },
  getOne: (filterQuery) => {
    return TourDestinationsModel.findOne(filterQuery);
  },
  getById: (id) => {
    return TourDestinationsModel.findById(id);
  },

  create: (payload) => {
    return TourDestinationsModel.create(payload);
  },
};
