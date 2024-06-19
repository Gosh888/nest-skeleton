import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './api/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggingInterceptor } from './interceptors/request-logging/request-logging.interceptor';
import { RequestLoggingMiddleware } from './middlewares/request-logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCacheModule } from './cache/cache.module';
import { RATE_LIMIT } from './config/config';
import { getDotEnvConfig, getPostgresConfig } from './core/core.utils';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    AppCacheModule,
    TypeOrmModule.forRoot(getPostgresConfig()),
    ConfigModule.forRoot(getDotEnvConfig()),
    ThrottlerModule.forRoot([RATE_LIMIT]),
    FirebaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
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
