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
    </nav>
  );
};

export default Navbar;