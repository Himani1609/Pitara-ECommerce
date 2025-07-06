import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/pages/OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="order-confirmation">
        <h2>No order found.</h2>
        <Link to="/shop" className="btn-link">Continue Shopping</Link>
      </div>
    );
  }

  const address = order.addressId;
  const items = order.items || [];

  return (
    <div className="order-confirmation">
      <h2>Thank you for your order!</h2>
      <p>Your order ID: <strong>{order._id}</strong></p>

      <div className="order-section">
        <h3>Shipping Address</h3>
        <p>{address?.fullName}</p>
        <p>{address?.street}, {address?.city}, {address?.state}</p>
        <p>{address?.country} - {address?.zip}</p>
        <p>Phone: {address?.phone}</p>
      </div>

      <div className="order-section">
        <h3>Order Items</h3>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.productId?.name} x {item.quantity} — ${item.productId?.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="order-summary">
        <p><strong>Total Paid:</strong> ${order.totalAmount?.toFixed(2)}</p>
      </div>

      <div className="order-actions">
        <Link to="/shop" className="btn-link">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
