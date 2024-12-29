const { TourDetailsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourDetailsModel.find(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({
        path: 'hotel',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'destination',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'images',
        select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 },
      });
  },
  getOne: (filterQuery) => {
    return TourDetailsModel.findOne(filterQuery)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({
        path: 'hotel',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'destination',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'images',
        select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 },
      });
  },
  create: (payload) => {
    return TourDetailsModel.create(payload);
  },
};
