import React from 'react';
import '../styles/pages/Cart.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import productImages from '../productImages';

const Cart = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); 

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Please login to view your cart.</p>
      </div>
    );
  }

  const handleQuantityChange = (productId, delta) => {
    const item = cartItems.find(i => i.productId && i.productId._id === productId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    updateQuantity(productId, newQty);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * (item.productId?.price || 0);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate('/checkout'); 
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div key={item._id} className="cart-item">
                {product.images?.length > 0 ? (
                  <img
                    src={productImages[product.images[0]] || '/placeholder.jpg'}
                    alt={product.name}
                  />
                ) : (
                  <img src="/placeholder.jpg" alt="No image" />
                )}

                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(product._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(product._id, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(product._id)} className="btn-remove">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="cart-summary">
            <h4>Total: ${getTotal()}</h4>
            <button className="btn-checkout" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
