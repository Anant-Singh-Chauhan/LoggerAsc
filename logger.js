const fs = require("fs");
const path = require("path");
const winston = require("winston");
const { combine, timestamp, json } = winston.format;

const env = process.env.NODE_ENV || "development";
const config = require(`./config/${env}`);
const logDir = path.join(__dirname, "logs");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// log formats
const consoleLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${level}: [${message}] [${timestamp}]`;
  })
);

// custom format for logs
const logFormat = combine(
  timestamp(),
  json() // format for Promtail
);

// Cache loggers for reuse
const loggerMap = {};

function getLogger(projectName = "default") {

  if (!loggerMap[projectName]) {
    loggerMap[projectName] = winston.createLogger({
      level: config.logLevel.toString(),
      format: logFormat,
      defaultMeta: {},
      transports: [
        new winston.transports.Console({
          format: consoleLogFormat,
          handleExceptions: true,
        }),
        new winston.transports.File({
          filename: path.join(logDir, `${projectName}.log`),
          handleExceptions: true,
          maxsize: 5 * 1024 * 1024, // 5 MB rotation
          maxFiles: 5,
        }),
      ],
    });
  }

  return loggerMap[projectName];
}

// Export the logger
module.exports = getLogger;
