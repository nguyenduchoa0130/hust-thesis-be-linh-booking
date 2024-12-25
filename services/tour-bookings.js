const { TourBookingsModel } = require('../models');

module.exports = {
  getAll: (filterQuery) => {
    return TourBookingsModel.find(filterQuery)
      .select({ __v: 0 })
      .populate({ path: 'payment', select: {} })
      .populate({ path: 'tourGuide', select: {} })
      .populate({ path: 'coordinator', select: {} })
      .populate({ path: 'customer', select: {} })
      .populate({ path: 'tourSchedule', select: {} })
      .sort({ createdAt: 'desc' });
  },
  create: (payload) => {
    return TourBookingsModel.create(payload);
  },
  update: (filterQuery, changes) => {
    return TourBookingsModel.updateOne(filterQuery, changes);
  },
};
