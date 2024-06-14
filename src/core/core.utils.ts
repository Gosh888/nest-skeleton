import { POSTGRES } from '../config/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER_CONSTANT } from '../constants/common.constant';
import { validate } from '../config/env.validation';

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

export const getSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle(SWAGGER_CONSTANT.TITLE)
    .setDescription(SWAGGER_CONSTANT.DESCRIPTION)
    .setVersion(SWAGGER_CONSTANT.VERSION)
    .addBearerAuth()
    .build();

export const getDotEnvConfig = () => ({
  envFilePath: '.env',
  isGlobal: true,
  validate,
});
