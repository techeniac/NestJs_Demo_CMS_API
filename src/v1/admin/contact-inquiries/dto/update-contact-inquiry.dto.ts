import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateContactInquiryDto {
  @ApiProperty({
    example: 'first name',
    required: true,
    type: 'string',
    name: 'firstName',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'last name',
    required: true,
    type: 'string',
    name: 'lastName',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'test@email.com',
    required: true,
    type: 'string',
    name: 'email',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: '9876543210',
    required: true,
    type: 'string',
    name: 'title',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    example: 'subject',
    required: false,
    type: 'string',
    name: 'subject',
  })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({
    example: 'test message',
    required: true,
    type: 'string',
    name: 'message',
  })
  @IsOptional()
  @IsString()
  message?: string;
}
