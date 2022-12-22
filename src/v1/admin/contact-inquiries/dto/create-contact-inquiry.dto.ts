import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContactInquiryDto {
  @ApiProperty({
    example: 'first name',
    required: true,
    type: 'string',
    name: 'firstName',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'last name',
    required: true,
    type: 'string',
    name: 'lastName',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'test@email.com',
    required: true,
    type: 'string',
    name: 'email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '9876543210',
    required: true,
    type: 'string',
    name: 'phone',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({
    example: 'subject',
    required: false,
    type: 'string',
    name: 'subject',
  })
  @IsOptional()
  @IsString()
  subject: string;

  @ApiProperty({
    example: 'test message',
    required: true,
    type: 'string',
    name: 'message',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
