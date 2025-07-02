const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Register admin
exports.registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
