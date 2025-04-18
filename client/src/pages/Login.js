// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Since we don't have a real authentication service yet, 
      // we'll mock a successful login for demo purposes
      if (email && password) {
        // Store a demo token
        localStorage.setItem('token', 'demo-token-12345');
        // Store user info
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          name: 'Demo User',
          email: email,
        }));
        // Redirect to home page
        navigate('/');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-banner">
            <h2>Welcome Back</h2>
            <p>Login to access your account, track orders, and get personalized recommendations.</p>
            <div className="auth-image">
              <img src="https://via.placeholder.com/400x600?text=Brand" alt="Brand" />
            </div>
          </div>
          
          <div className="auth-form-container">
            <div className="auth-form-wrapper">
              <h1 className="auth-title">Login</h1>
              {error && <div className="auth-error">{error}</div>}
              
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-extras">
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                
                <button 
                  type="submit" 
                  className={`btn btn-primary login-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
              
              <div className="social-login">
                <p>Or login with</p>
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
                  Don't have an account? <Link to="/register">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;