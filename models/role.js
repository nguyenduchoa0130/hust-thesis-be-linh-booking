const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    displayName: { type: String },
    desc: { type: String },
  },
  {
    timestamps: true,
  },
);

const Roles = mongoose.model('roles', roleSchema);
module.exports = Roles;
