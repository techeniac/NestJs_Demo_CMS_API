import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsSameAs } from '../../common/decorators';

export class ResetPasswordDto {
  @ApiProperty({
    example: '654321',
    required: true,
    type: 'string',
    name: 'otp',
  })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
    type: 'string',
    name: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@$$w0rd',
    required: true,
    type: 'string',
    name: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'new password too weak',
  })
  newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsSameAs('newPassword', { message: 'password mismatch' })
  newPasswordConfirm: string;
}
