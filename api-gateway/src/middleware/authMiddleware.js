/**
 * JWT Authentication Middleware for the API Gateway
 * Verifies user authentication tokens before forwarding requests
 */
const jwt = require('jsonwebtoken');

// Public routes that don't require authentication
const publicRoutes = [
  { path: '/api/users/login', method: 'POST' },
  { path: '/api/users/register', method: 'POST' },
  { path: '/api/products', method: 'GET' },
  { path: '/api/products/', method: 'GET' },
  { path: /^\/api\/products\/[^\/]+$/, method: 'GET' }, // Regex for single product routes
  { path: '/health', method: 'GET' },
  { path: '/', method: 'GET' },
  { path: '/api-docs', method: 'GET' },
  { path: /^\/api-docs\/.*/, method: 'GET' }, // All Swagger docs routes
];

/**
 * Check if a route is in the public routes list
 */
const isPublicRoute = (req) => {
  return publicRoutes.some(route => {
    // Check if route.path is a regex
    if (route.path instanceof RegExp) {
      return route.method === req.method && route.path.test(req.path);
    }
    return route.method === req.method && route.path === req.path;
  });
};

/**
 * Authentication middleware
 */
const authenticate = (req, res, next) => {
  // Skip authentication for public routes
  if (isPublicRoute(req)) {
    return next();
  }

  // Get the token from the request header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Authentication token is required' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request for downstream services
    req.user = decoded;
    
    // Add user ID to headers for microservices
    req.headers['x-user-id'] = decoded.userId;
    req.headers['x-user-role'] = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Invalid or expired token' 
    });
  }
};

module.exports = authenticate;