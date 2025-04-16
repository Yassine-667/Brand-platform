/**
 * E-commerce API Gateway
 * Main entry point for the API Gateway service
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import configuration
const swaggerDocs = require('./config/swagger');
const serviceConfig = require('./config/serviceUrls');

// Import middleware
const authenticate = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: eval(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Too many requests from this IP, please try again later.',
  },
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(limiter);

// Authentication middleware - applied globally
app.use(authenticate);

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Proxy Middleware Setup using service configuration
// Product Service
app.use(
  serviceConfig.routes.products,
  createProxyMiddleware({
    target: serviceConfig.urls.productService,
    changeOrigin: true,
    pathRewrite: {
      [`^${serviceConfig.routes.products}`]: '/api/products',
    },
  })
);

// Order Service
app.use(
  serviceConfig.routes.orders,
  createProxyMiddleware({
    target: serviceConfig.urls.orderService,
    changeOrigin: true,
    pathRewrite: {
      [`^${serviceConfig.routes.orders}`]: '/api/orders',
    },
  })
);

// User Service
app.use(
  serviceConfig.routes.users,
  createProxyMiddleware({
    target: serviceConfig.urls.userService,
    changeOrigin: true,
    pathRewrite: {
      [`^${serviceConfig.routes.users}`]: '/api/users',
    },
  })
);

// Inventory Service
app.use(
  serviceConfig.routes.inventory,
  createProxyMiddleware({
    target: serviceConfig.urls.inventoryService,
    changeOrigin: true,
    pathRewrite: {
      [`^${serviceConfig.routes.inventory}`]: '/api/inventory',
    },
  })
);

// Conditionally enable additional services
// Uncomment these blocks when the services are ready

// Auth Service
if (process.env.AUTH_SERVICE_ENABLED === 'true') {
  app.use(
    serviceConfig.routes.auth,
    createProxyMiddleware({
      target: serviceConfig.urls.authService,
      changeOrigin: true,
      pathRewrite: {
        [`^${serviceConfig.routes.auth}`]: '/api/auth',
      },
    })
  );
}

// Payment Service
if (process.env.PAYMENT_SERVICE_ENABLED === 'true') {
  app.use(
    serviceConfig.routes.payments,
    createProxyMiddleware({
      target: serviceConfig.urls.paymentService,
      changeOrigin: true,
      pathRewrite: {
        [`^${serviceConfig.routes.payments}`]: '/api/payments',
      },
    })
  );
}

// Review Service
if (process.env.REVIEW_SERVICE_ENABLED === 'true') {
  app.use(
    serviceConfig.routes.reviews,
    createProxyMiddleware({
      target: serviceConfig.urls.reviewService,
      changeOrigin: true,
      pathRewrite: {
        [`^${serviceConfig.routes.reviews}`]: '/api/reviews',
      },
    })
  );
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    message: 'API Gateway is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the E-commerce Microservices API Gateway',
    documentation: `${req.protocol}://${req.get('host')}/api-docs`,
    version: '1.0.0'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});

// Export app for testing
module.exports = app;