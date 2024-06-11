import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ErrorEnum } from '~/common/constants/error-code.constant'
import { BusinessException } from '~/common/exceptions/biz.exception'

import { isDev } from '../global/env'

interface myError {
  readonly status: number
  readonly statusCode?: number

  readonly message?: string
}

function isHttpExceptionResponse(
  response: any,
): response is myError {
  return typeof response.message === 'string'
}

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  constructor() {
    this.registerCatchAllExceptionsHook()
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const response = ctx.getResponse<FastifyReply>()

    const url = request.raw.url!
    // const url = request.raw?.url

    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : (exception as myError)?.status
        || (exception as myError)?.statusCode
        || HttpStatus.INTERNAL_SERVER_ERROR

    let message
      = (exception as any)?.response?.message
      || (exception as unknown as myError)?.message
      || `${exception}`

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR
      && !(exception instanceof BusinessException)
    ) {
      Logger.error(exception, undefined, 'Catch')
      if (!isDev)
        message = ErrorEnum.SERVER_ERROR?.split(':')[1]
    }
    else {
      this.logger.warn(
        `error message：(${status}) ${message} Path: ${decodeURI(url)}`,
      )
    }

    const apiErrorCode: number
      = exception instanceof BusinessException ? exception.getErrorCode() : status

    const resBody: IBaseResponse = {
      code: apiErrorCode,
      message,
      data: null,
    }

    response.status(status).send(resBody)
  }

  registerCatchAllExceptionsHook() {
    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection: ', reason)
    })

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err)
    })
  }
}
