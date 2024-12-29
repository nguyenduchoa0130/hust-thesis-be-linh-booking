const TourParticipants = require('../models/tour-participant');

module.exports = {
  getAll: (filterQuery) => {
    return TourParticipants.find(filterQuery).select({ __v: 0, createdAt: 0, updatedAt: 0 });
  },
  create: (payloads) => {
    return TourParticipants.insertMany(payloads);
  },
};
