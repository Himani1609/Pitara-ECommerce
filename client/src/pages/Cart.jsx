import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();
const userId = '6865be8105f3f3db9bee369e'; 

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      await axios.post(`http://localhost:5000/api/cart/add`, {
        userId,
        productId: product._id,
        quantity,
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    await axios.put(`http://localhost:5000/api/cart/update`, {
      userId,
      productId,
      quantity,
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await axios.delete(`http://localhost:5000/api/cart/remove`, {
      data: { userId, productId },
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
