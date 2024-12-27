const mongoose = require('mongoose');
const { TourRequirementStatusEnum } = require('../enums');

const tourRequirementSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    budget: { type: Number },
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
            TourRequirementStatusEnum.Pending,
            TourRequirementStatusEnum.Accepted,
            TourRequirementStatusEnum.Declined,
          ],
          default: TourRequirementStatusEnum.Pending,
        },
        reason: { type: String },
      },
    ],
    status: {
      type: String,
      enum: [
        TourRequirementStatusEnum.Pending,
        TourRequirementStatusEnum.Accepted,
        TourRequirementStatusEnum.Declined,
      ],
      default: TourRequirementStatusEnum.Pending,
    },
    reason: { type: String },
  },
  { timestamps: true },
);
const TourRequirements = mongoose.model('tourRequirements', tourRequirementSchema);
module.exports = TourRequirements;
