import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/config';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from './core/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
