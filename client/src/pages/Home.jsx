import React from 'react';
import '../styles/pages/Home.css';
import { Link } from 'react-router-dom';
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
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          <p>Coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
