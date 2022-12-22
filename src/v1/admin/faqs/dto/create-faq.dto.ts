import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    example: 'What is Lorem Ipsum?',
    description: 'title of the faq',
    required: true,
    type: 'string',
    name: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

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
}
