import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../enums/entity.tags';
import { IsAlpha, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(1)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}

@ApiTags(EntityTags.HEALTH)
@Controller(EntityTags.HEALTH)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async health() {
    return this.healthService.health();
  }
}
