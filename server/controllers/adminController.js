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

// Update admin by ID
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { firstName, lastName, email, role } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { firstName, lastName, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete admin by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const deleted = await Admin.findByIdAndDelete(adminId);

    if (!deleted) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get single admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
