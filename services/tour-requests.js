const { TourRequestsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourRequestsModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'creator',
        select: { __v: 0, password: 0, updatedAt: 0, createdAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'customer',
        select: { __v: 0, password: 0, updatedAt: 0, createdAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return TourRequestsModel.findOne(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'creator',
        select: { __v: 0, password: 0, updatedAt: 0, createdAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      })
      .populate({
        path: 'customer',
        select: { __v: 0, password: 0, updatedAt: 0, createdAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      });
  },
  create: (payload) => {
    return TourRequestsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return TourRequestsModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return TourRequestsModel.deleteOne(filterQuery);
  },
};
