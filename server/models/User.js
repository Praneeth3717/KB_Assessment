const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, default: null },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
