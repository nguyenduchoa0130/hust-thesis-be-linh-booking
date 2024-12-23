const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    iconName: { type: String },
  },
  { timestamps: true },
);

const TourTransports = mongoose.model('tourTransports', paymentMethodSchema);
module.exports = TourTransports;
