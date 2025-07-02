const express = require('express');
const router = express.Router();
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

router.get('/:userId', getUserCart);
router.post('/add', addToCart);
router.put('/item/:itemId', updateCartItem);
router.delete('/item/:itemId', removeCartItem);

module.exports = router;
