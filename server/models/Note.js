const mongoose = require('mongoose');
const User = require('./User');

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["personal", "home", "business"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
