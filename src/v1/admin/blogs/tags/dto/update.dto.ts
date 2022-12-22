import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({
    example: 'tag',
    required: false,
    type: 'string',
    name: 'title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'tag-1',
    description: 'description of the faq',
    required: false,
    type: 'string',
    name: 'slug',
  })
  @IsOptional()
  @IsString()
  slug?: string;
}
