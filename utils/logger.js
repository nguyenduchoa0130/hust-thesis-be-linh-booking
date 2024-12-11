const { createLogger, format, transports, addColors } = require('winston');

// Define custom log levels and their colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    debug: 'blue',
  },
};

// Apply the custom colors to Winston
addColors(customLevels.colors);

const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.colorize({ all: true }), // Enable colors for all log levels
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
  ),
  transports: [
    new transports.Console(), // Log to console with colors
    new transports.File({
      filename: 'logs/app.log',
      format: format.combine(
        format.uncolorize(), // Remove colors for file logging
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
      ),
    }),
  ],
});

module.exports = logger;
