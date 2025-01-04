const { ToursModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return ToursModel.find(filterQuery)
      .select({ thumbnailPath: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({
        path: 'category',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'transports',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'details',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
        populate: [
          { path: 'destination', select: { __v: 0, createdAt: 0, updatedAt: 0 } },
          {
            path: 'hotel',
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
            populate: { path: 'images', select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 } },
          },
          {
            path: 'images',
            select: { path: 0, __v: 0, createdAt: 0, updatedAt: 0 },
          },
        ],
      })
      .sort({ createdAt: 'desc', price: 'asc' });
  },

  getOne: (filterQuery) => {
    return ToursModel.findOne(filterQuery)
      .select({ thumbnailPath: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({
        path: 'category',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'transports',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'details',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
        populate: [
          { path: 'destination', select: { __v: 0, createdAt: 0, updatedAt: 0 } },
          {
            path: 'hotel',
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
            populate: { path: 'images', select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 } },
          },
          {
            path: 'images',
            select: { path: 0, __v: 0, createdAt: 0, updatedAt: 0 },
          },
        ],
      });
  },
  getRelevantTours: (tourId, categoryId) => {
    return ToursModel.find({
      _id: { $ne: tourId },
      category: categoryId,
    })
      .limit(3)
      .select({ thumbnailPath: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      .populate({
        path: 'category',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'transports',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
      })
      .populate({
        path: 'details',
        select: { __v: 0, createdAt: 0, updatedAt: 0 },
        populate: [
          { path: 'destination', select: { __v: 0, createdAt: 0, updatedAt: 0 } },
          {
            path: 'hotel',
            select: { __v: 0, createdAt: 0, updatedAt: 0 },
            populate: { path: 'images', select: { __v: 0, path: 0, createdAt: 0, updatedAt: 0 } },
          },
          {
            path: 'images',
            select: { path: 0, __v: 0, createdAt: 0, updatedAt: 0 },
          },
        ],
      });
  },
  create: (payload) => {
    return ToursModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return ToursModel.updateOne(filterQuery, changes);
  },
  remove: (filterQuery) => {
    return ToursModel.deleteOne(filterQuery);
  },
};
