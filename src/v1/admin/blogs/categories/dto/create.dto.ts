import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'category',
    required: true,
    type: 'string',
    name: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
