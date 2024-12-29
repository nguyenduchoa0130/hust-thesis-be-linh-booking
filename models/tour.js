const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: { type: String },
    introduction: { type: String },
    price: { type: Number },
    dayCount: { type: Number },
    nightCount: { type: Number },
    status: { type: String },
    thumbnailUrl: { type: String },
    thumbnailPath: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'tourCategories' },
    transports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tourTransports' }],
    details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tourDetails' }],
  },
  {
    timestamps: true,
  },
);

const Tours = mongoose.model('tours', tourSchema);
module.exports = Tours;
