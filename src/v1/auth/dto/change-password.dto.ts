import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsSameAs } from '../../common/decorators';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'P@$$w0rd',
    required: true,
    type: 'string',
    name: 'currentPassword',
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

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
