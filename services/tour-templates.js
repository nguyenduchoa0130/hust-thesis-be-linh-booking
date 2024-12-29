const { TourTemplatesModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourTemplatesModel.find(filterQuery).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  },
  getOne: (filterQuery) => {
    return TourTemplatesModel.findOne(filterQuery).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  },
  create: (payload) => {
    return TourTemplatesModel.create(payload);
  },
  remove: (filterQuery) => {
    return TourTemplatesModel.deleteOne(filterQuery);
  },
};
