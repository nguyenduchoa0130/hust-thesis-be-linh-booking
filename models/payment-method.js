const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    icon: { type: String },
    host: { type: String },
    port: { type: Number },
    path: { type: String },
    accessKey: { type: String },
    secretKey: { type: String },
    partnerCode: { type: String },
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

const PaymentMethods = mongoose.model('paymentMethods', paymentMethodSchema);
module.exports = PaymentMethods;
