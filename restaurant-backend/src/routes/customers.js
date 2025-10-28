const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  getCustomerByPhone,
  getCustomerCount,
  createCustomer,
} = require('../controllers/customerController');

router.get('/', getAllCustomers);
router.get('/count', getCustomerCount);
router.get('/phone/:phone', getCustomerByPhone);
router.post('/', createCustomer);

module.exports = router;