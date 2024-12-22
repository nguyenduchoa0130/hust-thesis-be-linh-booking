const { TourDetailImagesModel } = require('../models');

module.exports = {
  create: (payloads) => {
    return TourDetailImagesModel.insertMany(payloads);
  },
};
