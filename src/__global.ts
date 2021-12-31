import { LOG_LEVELS } from "_/services/logger/logger.constants";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "production" | "testing" | "development";
      NETWORK?: string; // homestead, goerli etc
      INFURA_API_KEY?: string;
      LOG_LEVEL?: keyof typeof LOG_LEVELS;
      PORT?: string; // number

      // k8s
      HOSTNAME?: string; // provided by docker or k8s
      SUMER_KAFKA_BOOTSTRAP_SERVICE_PORT?: string;
      SUMER_KAFKA_BOOTSTRAP_SERVICE_HOST?: string;
    }
  }
}

export {};
