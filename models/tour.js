const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    introduction: { type: String, required: true },
    price: { type: Number, required: true },
    dayCount: { type: Number, required: true },
    nightCount: { type: Number, required: true },
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
