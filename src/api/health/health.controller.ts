import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../enums/entity.tags';

@ApiTags(EntityTags.HEALTH)
@Controller(EntityTags.HEALTH)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async health() {
    return this.healthService.health();
  }
}
