import React from 'react';
import '../styles/pages/Home.css';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import productImages from '../productImages';

import category1 from '../assets/images/category/homedecor.jpg';
import category2 from '../assets/images/category/stationery.jpg';
import category3 from '../assets/images/category/artifacts.jpg';
import category4 from '../assets/images/category/plushies.jpg';

const categories = [
  { name: 'Home Décor', image: category1 },
  { name: 'Stationery', image: category2 },
  { name: 'Artifacts', image: category3 },
  { name: 'Plushies', image: category4 },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('products/featured');
        setFeatured(res.data);
      } catch (err) {
        console.error('Failed to load featured products', err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Unique Gifts at Pitara</h1>
          <p>Handpicked treasures made with love and tradition.</p>
          <Link to="/shop" className="btn-shop">Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} className="category-card" key={index}>
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="featured-section">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {featured.map(product => (
        <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`} className="product-link">
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
              {product.images.map((imgName, idx) => (
                <div key={idx}>
                  <img
                    src={productImages[imgName] || '/placeholder.jpg'}
                    alt={`${product.name} ${idx + 1}`}
                  />
                </div>
              ))}
            </Carousel>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            </Link>
          </div>
        ))}

      </div>
    </section>
    </div>
  );
};

export default Home;
