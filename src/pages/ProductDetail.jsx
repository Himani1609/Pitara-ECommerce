import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/ProductDetail.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import productImages from '../productImages';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleQuantity = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name}(s) to cart`);
  };

  if (!product) return (
  <div style={{
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2A9D8F',
    fontSize: '1.5rem'
  }}>
    Loading...
  </div>
);


  return (
    <div className="product-detail">
      <div className="product-detail-left">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop>
          {product.images.map((imgName, idx) => (
            <div key={idx}>
              <img src={productImages[imgName] || '/placeholder.jpg'} alt={`${product.name} ${idx + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="product-detail-right">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>In Stock:</strong> {product.stock}</p>

        {isAuthenticated && (
          <>
            <div className="quantity-control">
              <button onClick={() => handleQuantity(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity(1)}>+</button>
            </div>

            <button className="btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
