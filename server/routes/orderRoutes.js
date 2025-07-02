const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:userId', getUserOrders);
router.put('/:id', updateOrderStatus);

module.exports = router;
