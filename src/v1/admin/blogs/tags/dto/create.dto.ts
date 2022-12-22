import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    example: 'tag',
    required: true,
    type: 'string',
    name: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
