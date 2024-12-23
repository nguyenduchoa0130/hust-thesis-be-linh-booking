const { ToursModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return ToursModel.find(filterQuery)
      .select({ thumbnailPath: 0 })
      .populate('category')
      .populate('transports')
      .populate({
        path: 'details',
        populate: [
          { path: 'destination' },
          {
            path: 'images',
            select: { path: 0 },
          },
        ],
      })
      .sort({ createdAt: 'desc' });
  },
  getOne: (filterQuery) => {
    return ToursModel.findOne(filterQuery);
  },
  create: (payload) => {
    return ToursModel.create(payload);
  },
};
