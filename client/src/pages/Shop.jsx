import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/Shop.css';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const allProducts = res.data;

        if (categoryQuery) {
          const filtered = allProducts.filter(
            (prod) => prod.categoryId?.name === categoryQuery
          );
          setProducts(filtered);
        } else {
          setProducts(allProducts);
        }
      })
      .catch(err => console.error(err));
  }, [categoryQuery]);

  return (
    <div className="shop-page">
      <h2>{categoryQuery ? `Category: ${categoryQuery}` : 'All Products'}</h2>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map(prod => (
            <div className="product-card" key={prod._id}>
              <img src={prod.image || '/placeholder.jpg'} alt={prod.name} />
              <h4>{prod.name}</h4>
              <p>${prod.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
