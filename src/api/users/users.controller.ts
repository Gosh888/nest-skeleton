import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../enums/entity.tags';

@ApiTags(EntityTags.USERS)
@Controller(EntityTags.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
