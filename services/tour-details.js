const { TourDetailsModel } = require('../models');

module.exports = {
  create: (payload) => {
    return TourDetailsModel.create(payload);
  },
};
