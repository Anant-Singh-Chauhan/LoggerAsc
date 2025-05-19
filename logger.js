const path = require("path");
const winston = require("winston");
const { combine, timestamp, json } = winston.format;

const env = process.env.NODE_ENV || "development";
const config = require(`./config/${env}`);

const logFilePath = path.join(__dirname, "app.log");

const consoleLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${level}: [${message}] [${timestamp}]`;
  })
);

// Define the custom format for logs
const logFormat = combine(
  timestamp(),
  json() // Ensure logs are in JSON format for Promtail
);

const customLogger = winston.createLogger({
  level: config.logLevel.toString(),
  format: logFormat,
  defaultMeta: {}, // Remove default meta from here, set it per log
  transports: [
    new winston.transports.Console({
      format: consoleLogFormat,
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: logFilePath,
      handleExceptions: true,
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

// Export the logger
module.exports = customLogger;
