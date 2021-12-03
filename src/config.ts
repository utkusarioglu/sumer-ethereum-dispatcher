require("dotenv").config();
import { strict as assert } from "assert";

assert(process.env.NODE_ENV, ".env.NODE_ENV is required");
assert(process.env.INFURA_API_KEY, ".env.INFURA_API_KEY is required");
assert(process.env.NETWORK, ".env.NETWORK is required");

export const NODE_ENV = process.env.NODE_ENV;
export const INFURA_API_KEY = process.env.INFURA_API_KEY;
export const NETWORK = process.env.NETWORK;
