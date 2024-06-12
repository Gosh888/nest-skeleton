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
