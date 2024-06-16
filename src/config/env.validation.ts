import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_TYPE: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  REDIS_HOST: string;

  @IsString()
  REDIS_PASSWORD: string;

  @IsString()
  CORS_ORIGIN: string;

  @IsString()
  FIREBASE_TYPE: string;

  @IsString()
  FIREBASE_PROJECT_ID: string;

  @IsString()
  FIREBASE_PRIVATE_KEY_ID: string;

  @IsString()
  FIREBASE_PRIVATE_KEY: string;

  @IsString()
  FIREBASE_CLIENT_EMAIL: string;

  @IsString()
  FIREBASE_CLIENT_ID: string;

  @IsString()
  FIREBASE_AUTH_URI: string;

  @IsString()
  FIREBASE_TOKEN_URI: string;

  @IsString()
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;

  @IsString()
  FIREBASE_CLIENT_X509_CERT_URL: string;

  @IsString()
  FIREBASE_UNIVERSE_DOMAIN: string;

  @IsString()
  FIREBASE_CLIENT_APP_KEY: string;

  @IsString()
  FIREBASE_CLIENT_AUTH_DOMAIN: string;

  @IsString()
  FIREBASE_CLIENT_PROJECT_ID: string;

  @IsString()
  FIREBASE_CLIENT_STORAGE_BUCKET: string;

  @IsString()
  FIREBASE_CLIENT_MESSAGING_SENDER_ID: string;

  @IsString()
  FIREBASE_CLIENT_APP_ID: string;

  @IsString()
  FIREBASE_CLIENT_MEASUREMENT_ID: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
