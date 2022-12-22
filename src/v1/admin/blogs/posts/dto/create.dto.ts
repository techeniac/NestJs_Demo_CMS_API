import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category, Tag } from '../../../../mongoose/schemas';

export class CreatePostDto {
  @ApiProperty({
    example: 'post title',
    required: true,
    type: 'string',
    name: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'excerpt',
    required: false,
    type: 'string',
    name: 'excerpt',
  })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    required: false,
    type: 'string',
    name: 'content',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    example: 'image.jpg',
    required: false,
    type: 'string',
    name: 'image',
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: ['63887afaaffc02c52c75bc0f', '63887afaaffc02c52c75bc0f'],
    required: false,
    type: Array<String>,
    name: 'tags',
  })
  @IsOptional()
  // @IsString()
  @IsArray()
  tags?: Tag[];

  @ApiProperty({
    example: ['63887afaaffc02c52c75bc0f', '63887afaaffc02c52c75bc0f'],
    required: false,
    type: Array<String>,
    name: 'categories',
  })
  @IsOptional()
  @IsArray()
  categories?: Category[];

  @ApiProperty({
    example: 'meta title',
    required: false,
    type: 'string',
    name: 'metaTitle',
  })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiProperty({
    example: 'meta description',
    required: false,
    type: 'string',
    name: 'metaDescription',
  })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({
    example: 'meta keywords',
    required: false,
    type: 'string',
    name: 'metaKeywords',
  })
  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @ApiProperty({
    example: 'header contenr',
    required: false,
    type: 'string',
    name: 'headerContent',
  })
  @IsOptional()
  @IsString()
  headerContent?: string;
}
