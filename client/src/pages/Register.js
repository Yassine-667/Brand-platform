// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Since we don't have a real authentication service yet, 
      // we'll mock a successful registration for demo purposes
      localStorage.setItem('token', 'demo-token-12345');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: formData.name,
        email: formData.email,
      }));
      
      // Redirect to home page
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-banner">
            <h2>Join Our Community</h2>
            <p>Create an account to enjoy exclusive offers, save your shopping preferences, and get a personalized shopping experience.</p>
            <div className="auth-image">
              <img src="https://via.placeholder.com/400x600?text=Brand" alt="Brand" />
            </div>
          </div>
          
          <div className="auth-form-container">
            <div className="auth-form-wrapper">
              <h1 className="auth-title">Create Account</h1>
              {error && <div className="auth-error">{error}</div>}
              
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className={`btn btn-primary login-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
              
              <div className="social-login">
                <p>Or sign up with</p>
                <div className="social-buttons">
                  <button className="social-btn google">
                    <i className="fab fa-google"></i>
                    <span>Google</span>
                  </button>
                  <button className="social-btn facebook">
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
              
              <div className="auth-footer">
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;