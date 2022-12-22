import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'category',
    required: false,
    type: 'string',
    name: 'title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'category-1',
    required: false,
    type: 'string',
    name: 'slug',
  })
  @IsOptional()
  @IsString()
  slug?: string;
}
