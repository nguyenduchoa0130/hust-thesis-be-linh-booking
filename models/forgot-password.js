const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    confirmationCode: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    expiration: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const ForgotPassword = mongoose.model('forgotPasswords', forgotPasswordSchema);
module.exports = ForgotPassword;