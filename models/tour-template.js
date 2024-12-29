const mongoose = require('mongoose');

const tourTemplateSchema = new mongoose.Schema(
  {
    tourRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'tourRequests' },
    title: { type: String },
  },
  { timestamps: true },
);

const TourTemplates = mongoose.model('tourTemplates', tourTemplateSchema);
module.exports = TourTemplates;
