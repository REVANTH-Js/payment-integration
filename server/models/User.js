// File: server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp: String,
  otpExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);