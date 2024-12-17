const mongoose = require('mongoose');

const tourDetailSchema = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    ggMap: { type: String },
    destination: { type: String },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tourDetailImages' }],
  },
  { timestamps: true },
);

const TourDetails = mongoose.model('tourDetails', tourDetailSchema);
module.exports = TourDetails;
