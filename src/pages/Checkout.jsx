import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AddressForm from './AddressForm';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Checkout.css';

const Checkout = () => {
  
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const fetchAddresses = () => {
    API.get(`addresses/${user.user._id}`)
      .then(res => setAddresses(res.data))
      .catch(err => console.error('Failed to load addresses', err));
  };

  useEffect(() => {
    if (user?.user?._id) {
      fetchAddresses();
    }
  }, [user]);

  const handlePlaceOrder = () => {
  if (!selectedAddressId) return alert('Please select a shipping address.');

  const subtotal = cartItems.reduce((total, item) => total + item.quantity * (item.productId?.price || 0), 0);
  const shipping = 50;
  const tax = subtotal * 0.13;
  const totalAmount = subtotal + shipping + tax;

  API.post('orders', {
    userId: user.user._id,
    addressId: selectedAddressId,
    totalAmount,
    items: cartItems,
  }).then(async res => {
    await API.delete(`cart/clear/${user.user._id}`);
    clearCart(); 
    navigate('/order-confirmation', { state: { order: res.data } });
  }).catch(err => {
      console.error('Order placement failed:', err);
      alert('Failed to place order');
    });
  };

  const handleDelete = async (id) => {
    await API.delete(`addresses/${id}`);
    fetchAddresses();
  };

  const subtotal = cartItems.reduce((total, item) => total + item.quantity * (item.productId?.price || 0), 0);
  const shipping = 50;
  const tax = subtotal * 0.13;
  const total = (subtotal + shipping + tax).toFixed(2);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="address-section">
        <h4>Select Shipping Address</h4>
        {addresses.map(addr => (
          <div key={addr._id} className="address-list">
            <label>
              <input
                type="radio"
                name="address"
                value={addr._id}
                checked={selectedAddressId === addr._id}
                onChange={() => setSelectedAddressId(addr._id)}
              />
              {addr.fullName}, {addr.street}, {addr.city}
            </label>
            <div className="address-buttons">
              <button className="edit" onClick={() => { setShowForm(true); setEditingAddress(addr); }}>Edit</button>
              <button className="delete" onClick={() => handleDelete(addr._id)}>Delete</button>
            </div>
          </div>
        ))}

        <button className="add-address-btn" onClick={() => { setShowForm(true); setEditingAddress(null); }}>+ Add New Address</button>
        {showForm && (
          <AddressForm
            userId={user.user._id}
            existing={editingAddress}
            onSuccess={() => {
              setShowForm(false);
              setEditingAddress(null);
              fetchAddresses();
            }}
          />
        )}
      </div>

      <div className="cart-summary">
        <h4>Cart Summary</h4>
        <div className="cart-summary-item"><span>Total MRP:  </span> <span>${subtotal.toFixed(2)}</span></div>
        <div className="cart-summary-item"><span>Shipping:  </span> <span>${shipping.toFixed(2)}</span></div>
        <div className="cart-summary-item"><span>Taxes (13%):  </span> <span>${tax.toFixed(2)}</span></div>
        <div className="cart-summary-item total"><span>Total:  </span> <span>${total}</span></div>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
