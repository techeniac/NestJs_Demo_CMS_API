import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({
    example: 'full name',
    description: 'name of user',
    required: true,
    type: 'string',
    name: 'fullName',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

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
  @IsNotEmpty()
  @IsString()
  review: string;
}
