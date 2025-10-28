const express = require('express');
const router = express.Router();
const {
  getAllTables,
  getAvailableTables,
  createTable,
  updateTable,
  deleteTable,
  reserveTable,
  freeTable,
} = require('../controllers/tableController');

router.get('/', getAllTables);
router.get('/available', getAvailableTables);
router.post('/', createTable);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);
router.post('/:id/reserve', reserveTable);
router.post('/:id/free', freeTable);

module.exports = router;