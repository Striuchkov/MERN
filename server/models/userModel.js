const mongoose = require('mongoose');

// Utility to generate custom ID (e.g., C123456789)
const generateCustomId = (prefix) => {
  const digits = Math.floor(100000000 + Math.random() * 900000000).toString(); // 9 digits
  return `${prefix}${digits}`;
};

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => generateCustomId('C'), // e.g., C123456789
  },
  type: {
    type: String,
    required: true,
    enum: ['Client', 'Team', 'Admin'], // Example types, adjust as needed
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  additionalPhoneNumber: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  pets: [{
    type: String, // Custom string _id
    ref: 'Pet',   // Reference to Pet model
  }],
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Pending'], // Example statuses
  },
  rDVM: {
    type: String,
    required: true, // e.g., Referring Doctor of Veterinary Medicine
  },
  marketingChannel: {
    type: String,
    required: true, // e.g., "Social Media", "Referral", etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);