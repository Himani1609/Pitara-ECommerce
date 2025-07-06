const Address = require('../models/Address');

// Create new address
exports.addAddress = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      country,
      phone,
    } = req.body;

    if (!userId || !firstName || !lastName || !street || !city || !country) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newAddress = new Address({
      userId,
      fullName: `${firstName} ${lastName}`,
      street,
      city,
      state,
      zip,
      country,
      phone,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Failed to add address:', error);
    res.status(500).json({ message: 'Server error while saving address.' });
  }
};

// Get all addresses for a user
exports.getUserAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addresses = await Address.find({ userId });
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Failed to fetch addresses:', error);
    res.status(500).json({ message: 'Server error while fetching addresses.' });
  }
};


// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { userId, firstName, lastName, ...rest } = req.body;

    const updatedFields = {
      ...rest,
      fullName: `${firstName} ${lastName}`.trim(),
    };

    const updated = await Address.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Update address failed:', err);
    res.status(500).json({ error: err.message });
  }
};


// Delete address by ID
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Address.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete address:', error);
    res.status(500).json({ message: 'Server error while deleting address.' });
  }
};
