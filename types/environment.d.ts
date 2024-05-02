declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      JWT_SECRET: string;
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}

export {};
