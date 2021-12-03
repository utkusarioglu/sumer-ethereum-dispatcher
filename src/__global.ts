declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "testing" | "development";
      NETWORK: string; // homestad, goerli etc
      INFURA_API_KEY: string;
    }
  }
}

export {};
