const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  const userId = req.params.userId;
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  const populatedCart = await Cart.findOne({ userId }).populate('items.productId'); 
  res.status(200).json(populatedCart);
};

exports.updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(item => item.productId.equals(productId));
  if (item) item.quantity = quantity;

  await cart.save();
  const populatedCart = await Cart.findOne({ userId }).populate('items.productId'); 
  res.status(200).json(populatedCart);
};


exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  ).populate('items.productId'); 

  res.status(200).json(cart);
};

