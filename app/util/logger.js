const winston = require('winston');
const morgan = require('morgan');
const path = require('path');

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'combined.log') }),
  ],
});

// Create a stream for Morgan to use Winston for HTTP request logging
logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = {
  logger,
  morgan: morgan('combined', { stream: logger.stream }),
};