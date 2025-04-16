import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Sample data - in a real app, this would come from your API
  const [featuredCategories, setFeaturedCategories] = useState([
    {
      id: 1,
      name: 'T-Shirts',
      slug: 'tshirts',
      imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirts',
    },
    {
      id: 2,
      name: 'Pants',
      slug: 'pants',
      imageUrl: 'https://via.placeholder.com/300x400?text=Pants',
    },
    {
      id: 3,
      name: 'Dresses',
      slug: 'dresses',
      imageUrl: 'https://via.placeholder.com/300x400?text=Dresses',
    },
    {
      id: 4,
      name: 'Jackets',
      slug: 'jackets',
      imageUrl: 'https://via.placeholder.com/300x400?text=Jackets',
    },
  ]);

  const [newArrivals, setNewArrivals] = useState([
    {
      id: 1,
      name: 'Summer T-Shirt',
      price: 29.99,
      discount: 0,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x400?text=T-Shirt',
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 59.99,
      discount: 15,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x400?text=Jeans',
    },
    {
      id: 3,
      name: 'Casual Hoodie',
      price: 49.99,
      discount: 0,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x400?text=Hoodie',
    },
    {
      id: 4,
      name: 'Spring Jacket',
      price: 89.99,
      discount: 10,
      isNew: true,
      imageUrl: 'https://via.placeholder.com/300x400?text=Jacket',
    },
  ]);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Style</h1>
            <p>Explore our latest collection for the season</p>
            <Link to="/categories" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-categories">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section new-arrivals">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="grid grid-products">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-action">
            <Link to="/products/new" className="btn btn-primary">
              View All New Arrivals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;