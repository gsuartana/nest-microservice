import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import { API_SECURITY_AUTH } from '~/common/decorators'
import { env } from '~/common/global/env'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.headers[API_SECURITY_AUTH]
    if (!apiKey)
      throw new UnauthorizedException('API key is missing.')

    if (apiKey !== env('API_KEY'))
      throw new UnauthorizedException('Invalid API key.')

    return true
  }
}
