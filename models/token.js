const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const Tokens = mongoose.model('tokens', tokenSchema);
module.exports = Tokens;
