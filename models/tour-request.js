const mongoose = require('mongoose');
const { TourRequestStatusEnum } = require('../enums');

const tourRequestSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    budget: { type: Number },
    price: { type: Number },
    participantsCount: { type: Number },
    dayCount: { type: Number },
    nightCount: { type: Number },
    startAt: { type: Date },
    endAt: { type: Date },
    title: { type: String },
    requirements: [
      {
        destination: { type: String },
        desc: { type: String },
        status: {
          type: String,
          enum: [
            TourRequestStatusEnum.Pending,
            TourRequestStatusEnum.Accepted,
            TourRequestStatusEnum.Declined,
            TourRequestStatusEnum.Negotiating,
          ],
          default: TourRequestStatusEnum.Pending,
        },
        notes: { type: String },
      },
    ],
    status: {
      type: String,
      enum: [
        TourRequestStatusEnum.Pending,
        TourRequestStatusEnum.Accepted,
        TourRequestStatusEnum.Declined,
        TourRequestStatusEnum.Negotiating,
      ],
      default: TourRequestStatusEnum.Pending,
    },
    notes: { type: String },
    customerStatus: {
      type: String,
      enum: [
        TourRequestStatusEnum.Pending,
        TourRequestStatusEnum.Accepted,
        TourRequestStatusEnum.Declined,
        TourRequestStatusEnum.Negotiating,
      ],
      default: TourRequestStatusEnum.Pending,
    },
    customerNotes: { type: String },
    customerUpdatedAt: { type: Date },
  },
  { timestamps: true },
);
const TourRequests = mongoose.model('tourRequests', tourRequestSchema);
module.exports = TourRequests;
