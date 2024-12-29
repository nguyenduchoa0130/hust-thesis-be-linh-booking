const mongoose = require('mongoose');

const tourTemplateSchema = new mongoose.Schema(
  {
    title: { type: String },
    tourRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'tourRequests' },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'tours' },
  },
  { timestamps: true },
);

const TourTemplates = mongoose.model('tourTemplates', tourTemplateSchema);
module.exports = TourTemplates;
