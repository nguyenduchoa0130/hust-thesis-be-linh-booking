const mongoose = require('mongoose');

const tourCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String },
    maxParticipants: { type: Number, required: true },
  },
  { timestamps: true },
);

const TourCategories = mongoose.model('tourCategories', tourCategorySchema);
module.exports = TourCategories;
