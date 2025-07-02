const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Product Manager', 'Site Manager'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
