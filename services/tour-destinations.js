const { TourDestinationsModel } = require('../models');

module.exports = {
  getAll: () => {
    return TourDestinationsModel.find()
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return TourDestinationsModel.findOne(filterQuery).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  },
  getById: (id) => {
    return TourDestinationsModel.findById(id).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  create: (payload) => {
    return TourDestinationsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return TourDestinationsModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return TourDestinationsModel.deleteOne(filterQuery);
  },
};
