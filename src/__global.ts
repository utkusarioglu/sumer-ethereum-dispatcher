import { LOG_LEVELS } from "_/services/logger/logger.constants";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "testing" | "development";
      NETWORK: string; // homestead, goerli etc
      KAFKA_BROKERS: string; // csv
      HOSTNAME: string; // provided by docker or k8s
      INFURA_API_KEY: string;
      LOG_LEVEL?: keyof typeof LOG_LEVELS;
    }
  }
}

export {};
