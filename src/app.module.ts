import { ClassSerializerInterceptor, Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler'

import { HealthModule } from './application/health/health.module'
import { SearchModule } from './application/search/search.module'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { IdempotenceInterceptor } from './common/interceptors/idempotence.interceptor'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import config from './infrastructure/config'
import { SharedModule } from './infrastructure/shared/shared.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // When specifying multiple env files, the first one has the highest priority.
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    // Avoid brute force requests and limit the same interface to no more than 7 requests within 10 seconds.
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        errorMessage: 'Current operation is too frequent, please try again later!',
        throttlers: [
          { ttl: seconds(10), limit: 7 },
        ],
      }),

    }),
    SharedModule,
    HealthModule,
    SearchModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useFactory: () => new TimeoutInterceptor(15 * 1000) },
    { provide: APP_INTERCEPTOR, useClass: IdempotenceInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },

  ],
})

export class AppModule {}
