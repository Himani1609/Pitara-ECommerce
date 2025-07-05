import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/Shop.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import productImages from '../productImages';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const allProducts = res.data;
        const filtered = categoryQuery
          ? allProducts.filter(p => p.categoryId?.name === categoryQuery)
          : allProducts;
        setProducts(filtered);
      })
      .catch(err => console.error(err));
  }, [categoryQuery]);

  return (
    <div className="shop-page">
      <h2>{categoryQuery ? `Category: ${categoryQuery}` : 'All Products'}</h2>

      <div className="product-grid">
        {products.map(prod => (
          <div key={prod._id} className="product-card">
            <Link to={`/product/${prod._id}`} className="product-link">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
              {prod.images.map((imgName, idx) => (
                <div key={idx}>
                  <img src={productImages[imgName] || '/placeholder.jpg'} alt={`${prod.name} ${idx + 1}`} />
                </div>
              ))}
            </Carousel>
              <h4>{prod.name}</h4>
              <p>${prod.price}</p>
            </Link>

            {isAuthenticated && (
              <button
                className="btn-add-cart mt-2"
                onClick={() => addToCart(prod, 1)}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
