const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

// Get or create cart for user
exports.getUserCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId });
      await cart.save();
    }

    const items = await CartItem.find({ cartId: cart._id }).populate('productId');
    res.status(200).json({ cartId: cart._id, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add or update item in cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }

    let item = await CartItem.findOne({ cartId: cart._id, productId });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = new CartItem({ cartId: cart._id, productId, quantity });
      await item.save();
    }

    res.status(200).json({ message: 'Item added to cart', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity of cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const updated = await CartItem.findByIdAndUpdate(
      req.params.itemId,
      { quantity },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
