const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:userId', getUserOrders);

module.exports = router;
