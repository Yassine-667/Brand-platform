
/**
 * Swagger/OpenAPI configuration for the API Gateway
 */
const swaggerJsDoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce Microservices API',
      version: '1.0.0',
      description: 'API documentation for the e-commerce microservices',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
      {
        url: '/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      {
        name: 'Products',
        description: 'Product service endpoints',
      },
      {
        name: 'Orders',
        description: 'Order service endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Inventory',
        description: 'Inventory management endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API route documentation files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;