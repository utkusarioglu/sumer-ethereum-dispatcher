import { createLogger, transports, format } from "winston";
import { LOG_LEVELS } from "./logger.constants";
import { HOSTNAME, LOG_LEVEL, NODE_ENV } from "_/config";

const { timestamp, combine, colorize, printf, errors, json } = format;

const logFormat = printf(
  ({ level, message, timestamp, stack }) =>
    `[${level}] ${timestamp} ${stack || message}`
);

function devLogger() {
  return createLogger({
    levels: LOG_LEVELS,
    level: LOG_LEVEL,
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}

function prodLogger() {
  return createLogger({
    levels: LOG_LEVELS,
    level: LOG_LEVEL,
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: {
      service: "ethereum-dispatcher",
      hostname: HOSTNAME,
    },
    transports: [new transports.Console()],
  });
}

const loggerService = NODE_ENV === "development" ? devLogger() : prodLogger();

export default loggerService;
