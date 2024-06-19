import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { COMMON_ERROR_MESSAGES, REG_EXP } from 'src/constants/common.constant';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(REG_EXP.VALIDATE_PASSWORD, {
    message: COMMON_ERROR_MESSAGES.PASSWORD,
  })
  password: string;
}
