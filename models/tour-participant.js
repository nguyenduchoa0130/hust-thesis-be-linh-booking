const mongoose = require('mongoose');

const tourParticipantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true },
);

const TourParticipants = mongoose.model('tourParticipants', tourParticipantSchema);
module.exports = TourParticipants;
