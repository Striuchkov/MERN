const Pet = require('../models/petModel');
const User = require('../models/userModel');


exports.getAllPets = async (req, res) => {
    try {
      const pets = await Pet.find().populate('owners', 'name _id'); // Select only name and _id
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pets' });
    }
  };

exports.createPet = async (req, res) => {
  const { name, species, ownerIds } = req.body;
  try {
    const pet = new Pet({ name, species, owners: ownerIds });

    // Link pet to users
    if (ownerIds && ownerIds.length > 0) {
      await User.updateMany(
        { _id: { $in: ownerIds } },
        { $push: { pets: pet._id } }
      );
    }

    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create pet' });
  }
};

exports.getPetById = async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id).populate('owners', 'name _id');
      if (!pet) return res.status(404).json({ error: 'Pet not found' });
      res.json(pet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pet' });
    }
  };


