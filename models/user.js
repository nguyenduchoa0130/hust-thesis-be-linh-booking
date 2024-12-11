const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String },
    address: { type: String },
    avatar: { type: String },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Roles',
    },
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
