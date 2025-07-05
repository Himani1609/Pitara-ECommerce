import React from 'react';
import '../styles/pages/Cart.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Please login to view your cart.</p>
      </div>
    );
  }

  const handleQuantityChange = (productId, delta) => {
    const currentItem = cartItems.find(item => item._id === productId);
    if (!currentItem) return;
    const newQty = Math.max(1, currentItem.quantity + delta);
    updateQuantity(productId, newQty);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img
                src={`/assets/images/products/${item.images?.[0] || 'placeholder.jpg'}`}
                alt={item.name}
              />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h4>Total: ${getTotal()}</h4>
            <button className="btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
