import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class OtpDto {
  @ApiProperty({
    example: '321456',
    required: true,
    type: 'string',
    name: 'otp',
  })
  @IsNotEmpty()
  @IsString()
  otp: string;
}