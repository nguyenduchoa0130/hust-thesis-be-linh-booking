const mongoose = require('mongoose');

const tourBookingSchema = new mongoose.Schema(
  {
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tours', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    bookingDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Pending', 'Confirmed', 'Cancelled'] },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'] },
    paymentDetails: { type: Object },
    note: { type: String },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tourTransports' }],
  },
  { timestamps: true },
);

const TourBookings = mongoose.model('TourBookings', tourBookingSchema);
module.exports = TourBookings;
