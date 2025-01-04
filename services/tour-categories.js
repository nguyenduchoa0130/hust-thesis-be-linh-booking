const { TourCategoriesModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourCategoriesModel.find(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .sort({ createdAt: 'desc' });
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
  update: (filterQuery, changes) => {
    return TourCategoriesModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return TourCategoriesModel.deleteOne(filterQuery);
  },
};
