const Order = require('../models/Order');

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, addressId, totalAmount, items } = req.body;

    if (!userId || !addressId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const orderItems = items.map(item => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
      price: item.productId?.price || item.price
    }));

    const order = new Order({
      userId,
      addressId,
      totalAmount,
      orderItems
    });

    const savedOrder = await order.save();

    const populatedOrder = await Order.findById(savedOrder._id)
    .populate('addressId')
    .populate('orderItems.productId');

  res.status(201).json(populatedOrder);

  } catch (err) {
    console.error('Place order failed:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('addressId')
      .populate('orderItems.productId')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId')
      .populate('addressId')
      .populate('orderItems.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error('Get order by ID failed:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const { orderStatus, paymentStatus } = req.body;

    if (orderStatus) order.status = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updated = await order.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update full order
exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Failed to update order:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    console.error('Failed to delete order:', err);
    res.status(500).json({ error: err.message });
  }
};

// Send email confirmation after placing an order
const sendEmail = require('../utils/sendEmail');

exports.placeOrder = async (req, res) => {
  try {
    // Your existing order creation logic
    const newOrder = new Order({
      user: req.user.id,
      items: req.body.items,
      shippingAddress: req.body.shippingAddress,
      totalAmount: req.body.totalAmount,
    });

    const savedOrder = await newOrder.save();

    const user = await User.findById(req.user.id);

    const html = `
      <h2>Hi ${user.firstName},</h2>
      <p>Your order <strong>#${savedOrder._id}</strong> has been placed successfully.</p>
      <h4>Items:</h4>
      <ul>
        ${req.body.items.map(item => `<li>${item.name} - ${item.quantity} x ₹${item.price}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> ₹${req.body.totalAmount}</p>
      <p>We’ll notify you when your order is shipped.</p>
      <br><p>Thanks,<br/>The Pitara Team</p>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Your Pitara Order Confirmation',
      html
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
