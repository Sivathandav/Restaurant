const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getActiveOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/active', getActiveOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;