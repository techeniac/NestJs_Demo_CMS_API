import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TestimonialStatus } from '../../../mongoose/schemas';

export class UpdateTestimonialDto {
  @ApiProperty({
    example: 'full name',
    description: 'name of user',
    required: true,
    type: 'string',
    name: 'fullName',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    example: 'designation',
    description: 'designation of user',
    required: false,
    type: 'string',
    name: 'designation',
  })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty({
    example: 'image.jpg',
    description: "user's image",
    required: false,
    type: 'file',
    name: 'image',
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    description: 'review',
    required: true,
    type: 'string',
    name: 'review',
  })
  @IsOptional()
  @IsString()
  review?: string;

  @ApiProperty({
    example: 1,
    description: 'status of the faq 0 - inactive and 1 - active',
    required: false,
    type: '0 | 1',
    name: 'status',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsEnum(TestimonialStatus, {
    message: 'status must be 0 or 1 value',
  })
  status?: TestimonialStatus;
}
