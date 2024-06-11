import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import {
  HealthCheck,
  HttpHealthIndicator,
} from '@nestjs/terminus'

import { ApiKeyGuard } from '../auth/api-key.guard'

@ApiTags('Health - health check')
@Controller('health')
export class HealthController {
  constructor(
    private http: HttpHealthIndicator,
  ) {}

  @Get('network')
  @HealthCheck()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Endpoint that requires API key authentication' })
  @ApiSecurity('api-key')
  @ApiResponse({ status: 200, description: 'Success' })
  async checkNetwork() {
    return this.http.pingCheck('suartana', 'https://suartana.ch/')
  }
}
