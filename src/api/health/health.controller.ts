import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../core/entity.tags';
import { ThrottlerBehindProxyGuard } from 'src/guards/throttler-behind-proxy/throttler-behind-proxy.guard';

@ApiTags(EntityTags.HEALTH)
@UseGuards(ThrottlerBehindProxyGuard)
@Controller(EntityTags.HEALTH)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async health() {
    return this.healthService.health();
  }
}
