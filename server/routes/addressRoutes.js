const express = require('express');
const router = express.Router();
const {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress
} = require('../controllers/addressController');

router.post('/', addAddress);
router.get('/:userId', getUserAddresses);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
