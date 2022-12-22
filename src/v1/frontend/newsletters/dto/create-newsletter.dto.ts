import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsletterDto {
  @ApiProperty({
    example: 'test@email.com',
    required: true,
    type: 'string',
    name: 'email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}
