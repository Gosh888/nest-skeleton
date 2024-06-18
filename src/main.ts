import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { PORT } from './config/config';
import {
  getCorsConfig,
  getSwaggerConfig,
  getValidationPipeConfig,
} from './core/core.utils';
import { AllExceptionsFilter } from './errors/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(getCorsConfig());
  app.use(cookieParser());
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

  const swaggerConfig = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
