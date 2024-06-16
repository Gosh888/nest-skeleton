import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../enums/entity.tags';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags(EntityTags.AUTH)
@Controller(EntityTags.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async singUp(@Body() signUpDto: SignUpDto) {
    return this.authService.singUp(signUpDto);
  }

  @Post('/sign-in')
  async singIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto);
  }
}
