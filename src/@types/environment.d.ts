declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_ENCRYPT: string;
      SECRET_JWT: string;
    }
  }
}
export {};
