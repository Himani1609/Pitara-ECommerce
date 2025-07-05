import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AddressForm from './AddressForm';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Checkout.css';

const Checkout = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user?.user?._id) {
      axios.get(`http://localhost:5000/api/addresses/${user.user._id}`)
        .then(res => setAddresses(res.data))
        .catch(err => console.error('Failed to load addresses', err));
    }
  }, [user]);

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      alert('Please select a shipping address.');
      return;
    }

    axios.post('http://localhost:5000/api/orders', {
      userId: user.user._id,
      addressId: selectedAddressId,
      items: cartItems,
    }).then(res => {
      alert('Order placed!');
      navigate('/order-confirmation', { state: { order: res.data } });
    }).catch(err => {
      console.error('Order placement failed:', err);
      alert('Failed to place order');
    });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <h4>Select Shipping Address</h4>
      <div className="address-list">
        {addresses.map(addr => (
          <label key={addr._id} className="address-card">
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedAddressId === addr._id}
              onChange={() => setSelectedAddressId(addr._id)}
            />
            <div className="address-details">
              <strong>{addr.fullName}</strong><br />
              {addr.street}, {addr.city}, {addr.state}<br />
              {addr.country}, {addr.zip}<br />
              {addr.phone}
            </div>
          </label>
        ))}
      </div>

      <button className="btn-add-address" onClick={() => setShowForm(true)}>+ Add New Address</button>
      {showForm && (
        <div className="address-form">
          <AddressForm
            userId={user.user._id}
            onSuccess={() => {
              setShowForm(false);
              axios.get(`http://localhost:5000/api/addresses/${user.user._id}`)
                .then(res => setAddresses(res.data));
            }}
          />
        </div>
      )}

      <h4>Cart Summary</h4>
    <div className="cart-summary">
    <div className="summary-line">
        <span>Total MRP</span>
        <span>${cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0).toFixed(2)}</span>
    </div>
    <div className="summary-line">
        <span>Taxes (13%)</span>
        <span>${(cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0) * 0.13).toFixed(2)}</span>
    </div>
    <div className="summary-line">
        <span>Shipping Fee</span>
        <span>$7.00</span>
    </div>
    <div className="summary-line total">
        <span>Total Amount</span>
        <span>
        ${(
            cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0) * 1.13 + 7
        ).toFixed(2)}
        </span>
    </div>
    </div>


      <button className="btn-place-order" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
