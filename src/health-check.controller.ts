import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health-check')
export class HealthCheckController {
  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Health check of the server' })
  @ApiResponse({ status: 200, description: 'The server is healthy' })
  async getHealthStatus() {
    return { status: 'Ok' };
  }
}
