const { TourSchedulesModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourSchedulesModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'tour',
        select: { __v: 0, thumbnailPath: 0, details: 0, transports: 0, createdAt: 0, updatedAt: 0 },
        populate: [
          {
            path: 'category',
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
          },
        ],
      })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return TourSchedulesModel.findOne(filterQuery)
      .select({ __v: 0 })
      .populate({
        path: 'tour',
        select: { __v: 0, thumbnailPath: 0, details: 0, transports: 0, createdAt: 0, updatedAt: 0 },
        populate: [
          {
            path: 'category',
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
          },
        ],
      })
      .sort({ createdAt: 'desc' });
  },
  create: (payload) => {
    return TourSchedulesModel.create(payload);
  },
};