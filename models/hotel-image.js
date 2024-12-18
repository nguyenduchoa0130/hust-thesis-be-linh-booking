const mongoose = require('mongoose');

const hotelImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    path: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const HotelImages = mongoose.model('hotelImages', hotelImageSchema);
module.exports = HotelImages;
