import 'dotenv/config';

export const PORT = process.env.PORT || 3000;

export const REDIS = {
  HOST: process.env.REDIS_HOST,
  PORT: Number(process.env.REDIS_PORT),
  PASSWORD: process.env.REDIS_PASSWORD,
};

export const POSTGRES = {
  HOST: process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT),
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME,
};

export const FIREBASE = {
  TYPE: process.env.FIREBASE_TYPE,
  PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
  AUTH_URI: process.env.FIREBASE_AUTH_URI,
  TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  UNIVERSE_DOMAIN: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

export const CACHE_DURATION = {
  TTL_MINUTES: 60,
  TTL_HOURS: 3600,
  TTL_DAYS: 86400,
};

export const RATE_LIMIT = {
  ttl: 60000,
  limit: 50,
};

export const CORS = {
  ORIGIN: process.env.CORS_ORIGIN,
};
