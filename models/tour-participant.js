const mongoose = require('mongoose');

const tourParticipantSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    gender: { type: String },
    tourBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'tourBookings' },
  },
  { timestamps: true },
);

const TourParticipants = mongoose.model('tourParticipants', tourParticipantSchema);
module.exports = TourParticipants;
