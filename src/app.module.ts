import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './api/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggingInterceptor } from './interceptors/request-logging/request-logging.interceptor';
import { RequestLoggingMiddleware } from './middlewares/request-logging.middleware';
import { MethodBlockMiddleware } from './middlewares/block-http-methods.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCacheModule } from './cache/cache.module';
import { RATE_LIMIT } from './config/config';
import { getDotEnvConfig, getPostgresConfig } from './core/core.utils';

@Module({
  imports: [
    TypeOrmModule.forRoot(getPostgresConfig()),
    ConfigModule.forRoot(getDotEnvConfig()),
    ThrottlerModule.forRoot([RATE_LIMIT]),
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
    consumer
      .apply(RequestLoggingMiddleware, MethodBlockMiddleware)
      .forRoutes('*');
  }
}
