import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsSameAs } from '../../../common/decorators';

export class RegisterCustomerDto {
  @ApiProperty({
    example: 'firstName',
    required: true,
    type: 'string',
    name: 'firstName',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'lastName',
    required: true,
    type: 'string',
    name: 'lastName',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'email@gmail.com',
    required: true,
    type: 'string',
    name: 'email',
  })
  @IsNotEmpty()
  @IsString()
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
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsSameAs('password', { message: 'password mismatch' })
  passwordConfirm: string;
}
