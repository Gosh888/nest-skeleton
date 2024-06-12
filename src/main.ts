import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { PORT } from './config/config';
import { getSwaggerConfig } from './core/core.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    allowedHeaders: '*',
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const swaggerConfig = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
