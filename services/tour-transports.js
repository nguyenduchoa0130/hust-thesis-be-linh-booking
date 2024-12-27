const { TourTransportsModel } = require('../models');

module.exports = {
  getAll: () => {
    return TourTransportsModel.find()
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return TourTransportsModel.findOne(filterQuery).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  getById: (id) => {
    return TourTransportsModel.findById(id).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  create: (payload) => {
    return TourTransportsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return TourTransportsModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return TourTransportsModel.deleteOne(filterQuery);
  },
};
