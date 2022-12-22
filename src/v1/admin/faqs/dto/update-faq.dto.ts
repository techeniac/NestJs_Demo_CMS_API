import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FaqStatus } from '../../../mongoose/schemas';
export class UpdateFaqDto {
  @ApiProperty({
    example: 'What is Lorem Ipsum?',
    description: 'title of the faq',
    required: false,
    type: 'string',
    name: 'title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    description: 'description of the faq',
    required: false,
    type: 'string',
    name: 'description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'status of the faq 0 - inactive and 1 - active',
    required: false,
    type: '0 | 1',
    name: 'status',
  })
  @IsOptional()
  @IsEnum(FaqStatus, {
    message: 'status must be 0 or 1 value',
  })
  status?: FaqStatus;
}
