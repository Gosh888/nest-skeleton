import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class AuthUserDto {
  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsBoolean()
  emailVerified: boolean;

  @Expose()
  @Transform(({ obj }) => obj.stsTokenManager.refreshToken)
  @IsString()
  refreshToken: string;

  @Expose()
  @Transform(({ obj }) => obj.stsTokenManager.accessToken)
  @IsString()
  accessToken: string;
}
