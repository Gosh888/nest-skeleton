import { FIREBASE, POSTGRES, FIREBASE_CLIENT } from '../config/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER_CONSTANT } from '../constants/common.constant';
import { validate } from '../config/env.validation';
import { ServiceAccount } from 'firebase-admin';
import { ClassValidatorError } from '../errors/errors';

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

export const getFirebaseAdminConfig = () =>
  ({
    type: FIREBASE.TYPE,
    project_id: FIREBASE.PROJECT_ID,
    private_key_id: FIREBASE.PRIVATE_KEY_ID,
    private_key: FIREBASE.PRIVATE_KEY,
    client_email: FIREBASE.CLIENT_EMAIL,
    client_id: FIREBASE.CLIENT_ID,
    auth_uri: FIREBASE.AUTH_URI,
    token_uri: FIREBASE.TOKEN_URI,
    auth_provider_x509_cert_url: FIREBASE.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: FIREBASE.CLIENT_X509_CERT_URL,
    universe_domain: FIREBASE.UNIVERSE_DOMAIN,
  }) as ServiceAccount;

export const getFirebaseClientConfig = () => ({
  apiKey: FIREBASE_CLIENT.APP_KEY,
  authDomain: FIREBASE_CLIENT.AUTH_DOMAIN,
  projectId: FIREBASE_CLIENT.PROJECT_ID,
  storageBucket: FIREBASE_CLIENT.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CLIENT.MESSAGING_SENDER_ID,
  appId: FIREBASE_CLIENT.APP_ID,
  measurementId: FIREBASE_CLIENT.MEASUREMENT_ID,
});

export const getValidationPipeConfig = () => ({
  exceptionFactory: (errors) => {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints[Object.keys(error.constraints)[0]],
    }));
    return new ClassValidatorError(result);
  },
});
