import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../enums/entity.tags';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags(EntityTags.AUTH)
@Controller(EntityTags.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async singUp(@Body() signUpDto: SignUpDto) {
    return this.authService.singUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async singIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
