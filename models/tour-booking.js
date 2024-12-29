const mongoose = require('mongoose');
const { TourBookingStatusEnum } = require('../enums');

const tourBookingSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        TourBookingStatusEnum.Pending,
        TourBookingStatusEnum.Confirmed,
        TourBookingStatusEnum.Cancelled,
      ],
      default: TourBookingStatusEnum.Pending,
    },
    notes: { type: String },
    reason: { type: String },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'payments' },
    tourGuides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    tourSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'tourSchedules', required: true },
  },
  { timestamps: true },
);

const TourBookings = mongoose.model('TourBookings', tourBookingSchema);
module.exports = TourBookings;
