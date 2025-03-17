const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('pets', 'name _id');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  const {
    type, firstName, lastName, email, phoneNumber, additionalPhoneNumber,
    address, city, state, postalCode, status, rDVM, marketingChannel
  } = req.body;
  try {
    const user = new User({
      type, firstName, lastName, email, phoneNumber, additionalPhoneNumber,
      address, city, state, postalCode, status, rDVM, marketingChannel
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('pets', 'name _id');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};