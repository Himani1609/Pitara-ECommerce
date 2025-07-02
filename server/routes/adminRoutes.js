const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.get('/', getAllAdmins);
router.put('/:id', updateAdmin);      
router.delete('/:id', deleteAdmin);    

module.exports = router;
