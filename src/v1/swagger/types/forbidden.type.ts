import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponse {
  @ApiProperty({ type: 'number', default: 403 })
  statusCode: number;

  @ApiProperty({ type: 'string', default: 'forbidden' })
  message: string;
}
