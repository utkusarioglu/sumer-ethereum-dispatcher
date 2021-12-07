require("dotenv").config();
import { strict as assert } from "assert";
import { LOG_LEVEL_KEYS } from "./services/logger/logger.constants";

assert(process.env.NODE_ENV, ".env.NODE_ENV is required");
assert(process.env.INFURA_API_KEY, ".env.INFURA_API_KEY is required");
assert(process.env.NETWORK, ".env.NETWORK is required");
assert(process.env.KAFKA_BROKERS, ".env.KAFKA_BROKERS is required");
assert(process.env.HOSTNAME, ".env.HOSTNAME is required");
assert(
  process.env.LOG_LEVEL && LOG_LEVEL_KEYS.includes(process.env.LOG_LEVEL),
  [
    `.env.LOG_LEVEL is required to be one of the following:`,
    ...LOG_LEVEL_KEYS,
  ].join("\n")
);

export const NODE_ENV = process.env.NODE_ENV;
export const INFURA_API_KEY = process.env.INFURA_API_KEY;
export const NETWORK = process.env.NETWORK;
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS.split(",");
export const HOSTNAME = process.env.HOSTNAME;
export const LOG_LEVEL = process.env.LOG_LEVEL;
