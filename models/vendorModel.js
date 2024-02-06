// vendorModel.js
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Add other fields as needed
  isApproved: { type: Boolean, default: false },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
