// src/pages/OrderConfirmation.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/pages/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="order-confirmation">
        <h2>Order Not Found</h2>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <h2>Thank you for your order, {order.address.fullName}!</h2>
      <p>Your order has been placed successfully.</p>

      <div className="summary-section">
        <h3>Shipping Address</h3>
        <p>
          {order.address.fullName}<br />
          {order.address.street}<br />
          {order.address.city}, {order.address.state} {order.address.zip}<br />
          {order.address.country}<br />
          Phone: {order.address.phone}
        </p>

        <h3>Order Summary</h3>
        <ul>
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.product.name} × {item.quantity} — ${item.product.price * item.quantity}
            </li>
          ))}
        </ul>

        <h4>Total: ${order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</h4>
      </div>

      <div className="confirmation-actions">
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        <Link to="/my-orders" className="btn-secondary">View My Orders</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
