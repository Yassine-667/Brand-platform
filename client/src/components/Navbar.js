// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/styles/main.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { cart } = useCart();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Left Section: Hamburger menu and social icons */}
        <div className="navbar-left">
          <div className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <div className="navbar-social">
            <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        {/* Center: Brand Logo */}
        <div className="navbar-center">
          <Link to="/" className="navbar-logo">
            BRAND
          </Link>
        </div>
        
        {/* Right: User Actions */}
        <div className="navbar-right">
          <button className="navbar-action">
            <i className="fas fa-search"></i>
          </button>
          
          <Link to="/cart" className="navbar-action cart-indicator">
            <i className="fas fa-shopping-cart"></i>
            {cart.totalItems > 0 && (
              <span className="cart-badge">{cart.totalItems > 99 ? '99+' : cart.totalItems}</span>
            )}
          </Link>
          
          {isLoggedIn ? (
            <div className="user-dropdown">
              <button className="navbar-action user-action">
                <i className="fas fa-user"></i>
              </button>
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  Hi, {user?.name || 'User'}
                </div>
                <Link to="/account" className="dropdown-item">
                  <i className="fas fa-user-circle"></i> My Account
                </Link>
                <Link to="/orders" className="dropdown-item">
                  <i className="fas fa-box"></i> My Orders
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-action">
              <i className="fas fa-user"></i>
            </Link>
          )}
        </div>
      </div>
      
      {/* Navigation Menu (expandable) */}
      <div className={`navbar-menu-container ${isMenuOpen ? 'active' : ''}`}>
        <div className="container">
          <ul className="navbar-menu">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;