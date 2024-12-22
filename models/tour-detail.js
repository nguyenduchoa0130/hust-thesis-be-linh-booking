const mongoose = require('mongoose');

const tourDetailSchema = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tourDetailImages' }],
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'tourDestinations' },
  },
  { timestamps: true },
);

const TourDetails = mongoose.model('tourDetails', tourDetailSchema);
module.exports = TourDetails;
