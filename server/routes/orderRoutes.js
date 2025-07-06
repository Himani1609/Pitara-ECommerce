const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);      
router.patch('/:id', updateOrder);          
router.delete('/:id', deleteOrder);

module.exports = router;
