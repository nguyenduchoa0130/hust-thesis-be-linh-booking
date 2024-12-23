const { TourCategoriesModel } = require('../models');

module.exports = {
  getAll: () => {
    return TourCategoriesModel.find().sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return TourCategoriesModel.findOne(filterQuery);
  },
  getById: (id) => {
    return TourCategoriesModel.findById(id);
  },

  create: (payload) => {
    return TourCategoriesModel.create(payload);
  },
};
