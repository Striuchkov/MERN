const mongoose = require('mongoose');

// Utility to generate custom ID (e.g., C123456789)
const generateCustomId = (prefix) => {
  const digits = Math.floor(100000000 + Math.random() * 900000000).toString(); // 9 random digits
  return `${prefix}${digits}`;
};

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => generateCustomId('C'), // e.g., C123456789
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pets: [{
    type: String, // Use String since _id is a custom string
    ref: 'Pet',   // Reference to Pet model
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure _id is unique
userSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);