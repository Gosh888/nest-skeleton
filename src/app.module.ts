import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './api/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggingInterceptor } from './interceptors/request-logging/request-logging.interceptor';
import { RequestLoggingMiddleware } from './middlewares/request-logging/request-logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCacheModule } from './cache/cache.module';
import { configs } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(configs.postgres),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    ThrottlerModule.forRoot([configs.reteLimit]),
    HealthModule,
    AppCacheModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseLoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
