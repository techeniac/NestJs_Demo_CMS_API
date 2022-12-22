import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
  password: string;
}
