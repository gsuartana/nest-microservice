import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'

import {
  ConflictException,
  Injectable,
  SetMetadata,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { FastifyRequest } from 'fastify'
import { catchError, tap } from 'rxjs'

import { getIp, hashString } from '~/common/utils'

import { getRedisKey } from '~/common/utils/redis.util'
import { CacheService } from '~/infrastructure/shared/redis/cache.service'

import { HTTP_IDEMPOTENCE_KEY, HTTP_IDEMPOTENCE_OPTIONS } from '../decorators/idempotence.decorator'

const IdempotenceHeaderKey = 'x-idempotence'

export interface IdempotenceOption {
  errorMessage?: string
  pendingMessage?: string

  /**
   * If the request is repeated, handle the exception manually
   */
  handler?: (req: FastifyRequest) => any

  /**
   * Record the time of repeated requests
   * @default 60
   */
  expired?: number

  generateKey?: (req: FastifyRequest) => string

  /**
   * Only reads the header key and does not automatically generate it
   * @default false
   */
  disableGenerateKey?: boolean
}

@Injectable()
export class IdempotenceInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<FastifyRequest>()

    // skip Get
    if (request.method.toUpperCase() === 'GET')
      return next.handle()

    const handler = context.getHandler()
    const options: IdempotenceOption | undefined = this.reflector.get(
      HTTP_IDEMPOTENCE_OPTIONS,
      handler,
    )

    if (!options)
      return next.handle()

    const {
      errorMessage = 'The same request can only be sent once within 60 seconds after it is successful.',
      pendingMessage = 'The same request is being processed...',
      handler: errorHandler,
      expired = 60,
      disableGenerateKey = false,
    } = options
    const redis = this.cacheService.getClient()

    const idempotence = request.headers[IdempotenceHeaderKey] as string
    const key = disableGenerateKey
      ? undefined
      : options.generateKey
        ? options.generateKey(request)
        : this.generateKey(request)

    const idempotenceKey
      = !!(idempotence || key) && getRedisKey(`idempotence:${idempotence || key}`)

    SetMetadata(HTTP_IDEMPOTENCE_KEY, idempotenceKey)(handler)

    if (idempotenceKey) {
      const resultValue: '0' | '1' | null = (await redis.get(
        idempotenceKey,
      )) as any
      if (resultValue !== null) {
        if (errorHandler)
          return await errorHandler(request)

        const message = {
          1: errorMessage,
          0: pendingMessage,
        }[resultValue]
        throw new ConflictException(message)
      }
      else {
        await redis.set(idempotenceKey, '0', 'EX', expired)
      }
    }
    return next.handle().pipe(
      tap(async () => {
        idempotenceKey && (await redis.set(idempotenceKey, '1', 'KEEPTTL'))
      }),
      catchError(async (err) => {
        if (idempotenceKey)
          await redis.del(idempotenceKey)

        throw err
      }),
    )
  }

  private generateKey(req: FastifyRequest) {
    const { body, params, query = {}, headers, url } = req

    const obj = { body, url, params, query } as any

    const uuid = headers['x-uuid']
    if (uuid) {
      obj.uuid = uuid
    }
    else {
      const ua = headers['user-agent']
      const ip = getIp(req)

      if (!ua && !ip)
        return undefined

      Object.assign(obj, { ua, ip })
    }

    return hashString(JSON.stringify(obj))
  }
}
