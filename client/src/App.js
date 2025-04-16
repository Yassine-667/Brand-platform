// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import './assets/styles/main.css';
import './assets/styles/enhanced-styles.css'; // New enhanced styles

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products/:category" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>Brand</h3>
                  <p>Your fashion destination for premium clothing and accessories.</p>
                </div>
                <div className="footer-section">
                  <h3>Shop</h3>
                  <ul>
                    <li><a href="/products/new">New Arrivals</a></li>
                    <li><a href="/categories">Categories</a></li>
                    <li><a href="/products/sale">Sale</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Customer Service</h3>
                  <ul>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/shipping">Shipping & Returns</a></li>
                    <li><a href="/faq">FAQ</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Connect</h3>
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Brand. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;