const express = require('express');
const router = express.Router();
const { registerAdmin, getAllAdmins } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.get('/', getAllAdmins);

module.exports = router;
