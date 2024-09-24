const env = process.env.NODE_ENV || "development";
const config = require(`./config/${env}`);

const winston = require("winston");
require("winston-mongodb");
const log = require("./logModel"); // MongoDb Data Model

const { combine, timestamp, json } = winston.format;

const consoleLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ level, message, label, timestamp }) => {
    return `${level}: [${label}]: [${message}]: [${timestamp}]`;
  })
);

const customLogger = winston.createLogger({
  level: config.logLevel.toString(),
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: consoleLogFormat,
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: "app.log",
      handleExceptions: true,
    }),
    new winston.transports.MongoDB({
      db: config.dbUrl,
      collection: config.collection,
      level: config.logLevel,
      options: { useUnifiedTopology: true },
      metaKey: "meta",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

module.exports = customLogger;
