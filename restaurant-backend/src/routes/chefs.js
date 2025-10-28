const express = require('express');
const router = express.Router();
const {
  getAllChefs,
  getChefForAssignment,
  createChef,
  updateChef,
} = require('../controllers/chefController');

router.get('/', getAllChefs);
router.get('/assign', getChefForAssignment);
router.post('/', createChef);
router.put('/:id', updateChef);

module.exports = router;