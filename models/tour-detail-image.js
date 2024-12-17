const mongoose = require('mongoose');

const tourDetailImageSchema = new mongoose.Schema(
  {
    name: { type: String },
    url: { type: String },
    path: { type: String },
  },
  { timestamps: true },
);

const TourDetailImages = mongoose.model('tourDetailImages', tourDetailImageSchema);
module.exports = TourDetailImages;
