const mongoose = require('mongoose');

const tourTransportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    iconName: { type: String },
  },
  { timestamps: true },
);

const TourTransports = mongoose.model('tourTransports', tourTransportSchema);
module.exports = TourTransports;
