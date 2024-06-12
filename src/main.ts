import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CORS, PORT } from './config/config';
import { getSwaggerConfig } from './core/core.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: CORS.ORIGIN,
    methods: ['PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Authorization',
      'X-SharedEditing',
      'Content-Length',
      'Content-Type',
      'Origin',
    ],
    exposedHeaders: ['X-Total-Count'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: -1,
  });

  const swaggerConfig = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
