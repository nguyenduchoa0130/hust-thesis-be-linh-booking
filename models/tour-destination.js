const mongoose = require('mongoose');

const tourDestinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    ggMap: { type: String },
  },
  { timestamps: true },
);

const TourDestinations = mongoose.model('tourDestinations', tourDestinationSchema);
module.exports = TourDestinations;
