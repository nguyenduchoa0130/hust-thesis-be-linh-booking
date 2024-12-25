const mongoose = require('mongoose');
const { PaymentStatusEnum } = require('../enums');

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentMethods' },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: [PaymentStatusEnum.Pending, PaymentStatusEnum.Paid, PaymentStatusEnum.Refund],
      default: PaymentStatusEnum.Pending,
    },
    tourSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'tourSchedules', required: true },
  },
  { timestamps: true },
);

const Payments = mongoose.model('payments', paymentSchema);
module.exports = Payments;
