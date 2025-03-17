const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('pets');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
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