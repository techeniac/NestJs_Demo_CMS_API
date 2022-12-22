import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UnsubscribeNewsletterDto {
  @ApiProperty({
    example: 'reason here',
    required: true,
    type: 'string',
    name: 'reason',
  })
  @IsNotEmpty()
  @IsString()
  reason: string;
}
