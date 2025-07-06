const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  zip: String,
  country: { type: String, required: true },
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
