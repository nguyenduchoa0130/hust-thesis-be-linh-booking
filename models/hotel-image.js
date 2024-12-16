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

// hotel: 675f15524169eeea7cb861ec
// hotel image: 675f15524169eeea7cb861ee
