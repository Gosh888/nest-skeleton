import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';

export const PORT = process.env.PORT || 3000;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_URL = `${REDIS_HOST}:${REDIS_PORT}`;

export const configs = {
  postgres: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
  } as TypeOrmModuleOptions,
  reteLimit: {
    ttl: 60000,
    limit: 100,
  },
};
