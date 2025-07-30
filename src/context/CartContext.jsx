import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
  localStorage.setItem('pitara_cart', JSON.stringify(cartItems));
  }, [cartItems]);


  const fetchCart = async (userId) => {
    if (!userId) return;
    try {
      const res = await API.get(`cart/${userId}`);
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error('Fetch cart failed:', err);
    }
  };

  const addToCart = async (product, quantity) => {
    const userId = user?.user?._id;
    if (!userId) {
      alert('Please login to add item in cart');
      return;
    }
    try {
      await API.post('cart/add', {
        userId,
        productId: product._id,
        quantity,
      });
      fetchCart(userId);
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const userId = user?.user?._id;
    if (!userId) return;
    try {
      await API.put('cart/update', {
        userId,
        productId,
        quantity,
      });
      fetchCart(userId);
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  };

  const removeFromCart = async (productId) => {
    const userId = user?.user?._id;
    if (!userId) return;
    try {
      await API.delete('cart/remove', {
        data: { userId, productId },
      });
      fetchCart(userId);
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  useEffect(() => {
    const userId = user?.user?._id;
    if (userId) {
      fetchCart(userId);
    } else {
      setCartItems([]); 
    }
  }, [user]);

  const clearCart = async () => {
    try {
      setCartItems([]);
      localStorage.removeItem('cart');
      
      if (user?.user?._id) {
        await API.delete(`cart/clear/${user.user._id}`);
      }
    } catch (err) {
      console.error('Failed to clear server cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart,  clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
