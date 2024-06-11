import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { POSTGRES } from '../config/config';

export const getPostgresConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true,
});
