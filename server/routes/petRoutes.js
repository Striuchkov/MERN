const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Pet routes
router.get('/', petController.getAllPets);
router.post('/', petController.createPet);
router.get('/:id', petController.getPetById);

module.exports = router;