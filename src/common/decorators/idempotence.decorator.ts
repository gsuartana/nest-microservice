import { SetMetadata } from '@nestjs/common'

import { IdempotenceOption } from '../interceptors/idempotence.interceptor'

export const HTTP_IDEMPOTENCE_KEY = '__idempotence_key__'
export const HTTP_IDEMPOTENCE_OPTIONS = '__idempotence_options__'

export function Idempotence(options?: IdempotenceOption): MethodDecorator {
  return function (target, key, descriptor: PropertyDescriptor) {
    SetMetadata(HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value)
  }
}
