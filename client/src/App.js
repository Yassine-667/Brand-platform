// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import './assets/styles/main.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:category" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
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
  );
}

export default App;