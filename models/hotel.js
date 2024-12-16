const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    introduction: { type: String },
    address: { type: String, required: true },
    star: { type: Number, default: 5, max: 5 },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'hotelImages' }],
  },
  {
    timestamps: true,
  },
);

const Hotels = mongoose.model('hotels', hotelSchema);
module.exports = Hotels;
