import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '../../../../mongoose/schemas';
import { CreatePostDto } from './create.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    example: 'What is Lorem Ipsum?',
    required: true,
    type: 'string',
    name: 'title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'what-is-lorem-ipsum',
    required: true,
    type: 'string',
    name: 'slug',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: 1,
    description: 'status of the faq 0 - UNPUBLISHED and 1 - PUBLISHED',
    required: false,
    type: '0 | 1',
    name: 'status',
  })
  @IsOptional()
  @IsEnum(PostStatus, {
    message: 'status must be 0 or 1 value',
  })
  status?: PostStatus;
}
