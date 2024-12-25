const TourParticipants = require('../models/tour-participant');

module.exports = {
  create: (payloads) => {
    return TourParticipants.insertMany(payloads);
  },
};
