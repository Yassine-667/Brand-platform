/**
 * Rate Limiting Middleware
 * Protects the API from abuse by limiting request frequency
 */
const rateLimit = require('express-rate-limit');

// Create basic rate limiter
const createRateLimiter = (options = {}) => {
  const defaultOptions = {
    windowMs: eval(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      error: 'Too many requests',
      message: 'Too many requests from this IP, please try again later.',
      status: 429
    }
  };

  return rateLimit({
    ...defaultOptions,
    ...options
  });
};

// Create a stricter rate limiter for authentication endpoints
const authLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour
  message: {
    error: 'Too many login attempts',
    message: 'Too many login attempts from this IP, please try again after an hour',
    status: 429
  }
});

module.exports = {
  createRateLimiter,
  authLimiter,
  // Default limiter for general API endpoints
  apiLimiter: createRateLimiter()
};