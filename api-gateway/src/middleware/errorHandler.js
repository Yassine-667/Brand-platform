/**
 * Global error handling middleware
 * Provides consistent error responses across the API Gateway
 */

// Custom error classes
class APIError extends Error {
    constructor(message, statusCode, errorCode) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Error handler middleware
  const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(`[Error] ${req.method} ${req.url}:`, err);
    
    // Default error status and message
    let statusCode = 500;
    let errorMessage = 'Something went wrong on the server';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    
    // Handle known error types
    if (err instanceof APIError) {
      statusCode = err.statusCode;
      errorMessage = err.message;
      errorCode = err.errorCode;
    } else if (err.name === 'SyntaxError') {
      statusCode = 400;
      errorMessage = 'Invalid JSON in request body';
      errorCode = 'INVALID_JSON';
    } else if (err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = err.message;
      errorCode = 'VALIDATION_ERROR';
    } else if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
      statusCode = 503;
      errorMessage = 'Service temporarily unavailable';
      errorCode = 'SERVICE_UNAVAILABLE';
    }
    
    // Return error response
    res.status(statusCode).json({
      error: {
        code: errorCode,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
      }
    });
  };
  
  // Export the error handler and custom error classes
  module.exports = {
    errorHandler,
    APIError,
  };
