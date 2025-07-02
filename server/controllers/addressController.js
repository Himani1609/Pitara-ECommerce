const Address = require('../models/Address');

// Create address
exports.addAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all addresses for a user
exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
