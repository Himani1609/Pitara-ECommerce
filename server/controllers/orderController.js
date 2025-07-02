const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, addressId, totalAmount, items } = req.body;

    const order = new Order({ userId, addressId, totalAmount });
    await order.save();

    const orderItems = items.map(item => ({
      orderId: order._id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.insertMany(orderItems);

    res.status(201).json({ message: 'Order placed', orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('addressId')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const { orderStatus, paymentStatus } = req.body;

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updated = await order.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
