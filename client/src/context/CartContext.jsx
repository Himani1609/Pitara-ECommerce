import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    
    if (user?.userId) {
      fetchCart(user.userId);
    }
  }, [user]); 

  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error('Fetch cart failed:', err);
    }
  };

  const addToCart = async (product, quantity) => {
    if (!user?.userId) {
      alert("Please login to add item in cart");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/cart/add`, {
        userId: user.userId,
        productId: product._id,
        quantity,
      });
      fetchCart(user.userId);
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user?.userId) return;
    await axios.put(`http://localhost:5000/api/cart/update`, {
      userId: user.userId,
      productId,
      quantity,
    });
    fetchCart(user.userId);
  };

  const removeFromCart = async (productId) => {
    if (!user?.userId) return;
    await axios.delete(`http://localhost:5000/api/cart/remove`, {
      data: { userId: user.userId, productId },
    });
    fetchCart(user.userId);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
