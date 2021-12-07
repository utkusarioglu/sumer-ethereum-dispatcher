import { LOG_LEVEL } from "_/config";
import { logLevel, LogEntry } from "kafkajs";
import loggerService from "../logger/logger.service";

/**
 * Converts kafkajs log level to RFC 5424 log level equivalent
 * @param level kafkajs logLevel
 * @returns RFC 5424 log level equivalent
 */
const rfc5424Adapter = (level: logLevel) => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return "error";
    case logLevel.WARN:
      return "warn";
    case logLevel.INFO:
      return "info";
    case logLevel.DEBUG:
      return "debug";
  }
};

/**
 * Converts RFC 5424 convention to kafkajs logLevel
 * @returns kafkajs logLevel
 */
export function kafkaLogLevelAdapter() {
  switch (LOG_LEVEL) {
    case "emerg":
    case "alert":
    case "crit":
    case "error":
      return logLevel.ERROR;
    case "warning":
    case "notice":
      return logLevel.WARN;
    case "info":
      return logLevel.INFO;
    case "debug":
      return logLevel.DEBUG;

    default:
      return logLevel.DEBUG;
  }
}

/**
 * Logs kafkajs events using loggingService
 * @returns void
 */
export const loggingServiceAdapter = () => {
  return ({ namespace, level, label, log }: LogEntry) => {
    const { message, ...extra } = log;
    loggerService.log({
      level: rfc5424Adapter(level),
      message,
      extra,
      namespace,
      label,
    });
  };
};
