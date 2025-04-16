/**
 * Enhanced request logging middleware
 * Provides detailed logging of API requests for monitoring and debugging
 */
const winston = require('winston');
const morgan = require('morgan');

// Create winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-gateway' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        })
      )
    }),
    // Add file transport in production
    ...(process.env.NODE_ENV === 'production' 
      ? [
          new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            maxsize: 10485760, // 10MB
            maxFiles: 5
          }),
          new winston.transports.File({ 
            filename: 'logs/combined.log',
            maxsize: 10485760, // 10MB
            maxFiles: 5
          })
        ] 
      : [])
  ]
});

// Create a stream object for morgan to use
const morganStream = {
  write: (message) => {
    // Remove newline character from morgan log message
    const logMessage = message.trim();
    logger.http(logMessage);
  },
};

// Skip logging for health check endpoint to reduce noise
const skipHealthCheck = (req, res) => {
  return req.url === '/health';
};

// Define custom morgan format
const morganFormat = process.env.NODE_ENV === 'production' 
  ? ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
  : 'dev';

// Create the morgan middleware
const requestLogger = morgan(morganFormat, {
  stream: morganStream,
  skip: skipHealthCheck
});

module.exports = {
  requestLogger,
  logger
};