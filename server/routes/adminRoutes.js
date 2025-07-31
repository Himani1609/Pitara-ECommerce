const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const {
  registerAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.get('/', getAllAdmins);
router.put('/:id', updateAdmin);      
router.delete('/:id', deleteAdmin); 
router.get('/:id', getAdminById);   

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin added', admin: newAdmin });
  } catch (err) {
    console.error('Add admin error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
