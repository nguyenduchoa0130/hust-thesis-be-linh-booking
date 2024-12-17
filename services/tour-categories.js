const { TourCategoriesModel } = require('../models');

module.exports = {
  getAll: () => {
    return TourCategoriesModel.find().select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  getOne: (filterQuery) => {
    return TourCategoriesModel.findOne(filterQuery).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  getById: (id) => {
    return TourCategoriesModel.findById(id).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },

  create: (payload) => {
    return TourCategoriesModel.create(payload);
  },
};