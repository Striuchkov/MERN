const mongoose = require('mongoose');

// Utility to generate custom ID (e.g., P123456789)
const generateCustomId = (prefix) => {
  const digits = Math.floor(100000000 + Math.random() * 900000000).toString(); // 9 random digits
  return `${prefix}${digits}`;
};

const petSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => generateCustomId('P'), // e.g., P987654321
  },
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  owners: [{
    type: String, // Use String since _id is a custom string
    ref: 'User',  // Reference to User model
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure _id is unique
petSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('Pet', petSchema);