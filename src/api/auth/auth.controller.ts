import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { EntityTags } from '../../enums/entity.tags';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response, Request } from 'express';
import { getRefreshTokenCookieConfig } from 'src/core/core.utils';

@ApiTags(EntityTags.AUTH)
@Controller(EntityTags.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async singUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...userData } =
      await this.authService.singUp(signUpDto);
    res.cookie('refreshToken', refreshToken, getRefreshTokenCookieConfig());

    return userData;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async singIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...userData } =
      await this.authService.singIn(signInDto);
    res.cookie('refreshToken', refreshToken, getRefreshTokenCookieConfig());

    return userData;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/refresh-token')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { access_token, refresh_token } = await this.authService.refreshToken(
      req.cookies.refreshToken,
    );
    res.cookie('refreshToken', refresh_token, getRefreshTokenCookieConfig());

    return { access_token };
  }
}
