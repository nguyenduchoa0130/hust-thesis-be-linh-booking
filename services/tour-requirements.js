const { TourRequirementsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourRequirementsModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'creator',
        select: { __v: 0, password: 0, updatedAt: 0, createdAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      });
  },
  getOne: (filterQuery) => {
    return TourRequirementsModel.findOne(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'creator',
        select: { __v: 0, password: 0, updatedAt: 0, createdAt: 0 },
        populate: [{ path: 'role', select: { __v: 0, createdAt: 0, updatedAt: 0 } }],
      });
  },
  create: (payload) => {
    return TourRequirementsModel.create(payload);
  },
};
