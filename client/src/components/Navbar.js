// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/main.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          BRAND
        </Link>
        
        <div className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/categories" className="navbar-link">Categories</Link>
          </li>
          <li>
            <Link to="/products/new" className="navbar-link">New Arrivals</Link>
          </li>
          <li>
            <Link to="/products/sale" className="navbar-link">Sale</Link>
          </li>
        </ul>
        
        <div className="navbar-actions">
          <button className="navbar-action">
            <i className="fas fa-search"></i>
          </button>
          <Link to="/cart" className="navbar-action">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;