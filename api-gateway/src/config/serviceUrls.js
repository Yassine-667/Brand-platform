/**
 * Centralized configuration for microservice URLs
 * This provides a single source of truth for all service URLs
 */

// Load environment variables
require('dotenv').config();

// Default URLs for local development
const defaultUrls = {
  productService: 'http://localhost:3001',
  orderService: 'http://localhost:3002',
  userService: 'http://localhost:3003',
  inventoryService: 'http://localhost:3004',
  authService: 'http://localhost:3005',
  paymentService: 'http://localhost:3006',
  reviewService: 'http://localhost:3007',
};

// Service URLs with environment variable fallbacks
const serviceUrls = {
  productService: process.env.PRODUCT_SERVICE_URL || defaultUrls.productService,
  orderService: process.env.ORDER_SERVICE_URL || defaultUrls.orderService,
  userService: process.env.USER_SERVICE_URL || defaultUrls.userService,
  inventoryService: process.env.INVENTORY_SERVICE_URL || defaultUrls.inventoryService,
  authService: process.env.AUTH_SERVICE_URL || defaultUrls.authService,
  paymentService: process.env.PAYMENT_SERVICE_URL || defaultUrls.paymentService,
  reviewService: process.env.REVIEW_SERVICE_URL || defaultUrls.reviewService,
};

// Export service URLs and route patterns
module.exports = {
  urls: serviceUrls,
  routes: {
    products: '/api/products',
    orders: '/api/orders',
    users: '/api/users',
    inventory: '/api/inventory',
    auth: '/api/auth',
    payments: '/api/payments',
    reviews: '/api/reviews',
  },
};