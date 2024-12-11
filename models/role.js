const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
  },
  {
    timestamps: true,
  },
);

const Roles = mongoose.model('Roles', roleSchema);
module.exports = Roles;
