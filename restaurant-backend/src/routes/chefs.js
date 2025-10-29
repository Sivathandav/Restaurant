const express = require('express');
const router = express.Router();
const {
  getAllChefs,
  getChef,
  createChef,
  updateChef,
  toggleChefAvailability,
  deleteChef,
  getChefStatistics
} = require('../controllers/chefController');

// Get chef statistics
router.get('/stats', getChefStatistics);

// Get all chefs
router.get('/', getAllChefs);

// Get single chef
router.get('/:id', getChef);

// Create new chef
router.post('/', createChef);

// Update chef
router.put('/:id', updateChef);

// Toggle chef availability
router.patch('/:id/availability', toggleChefAvailability);

// Delete chef
router.delete('/:id', deleteChef);

module.exports = router;