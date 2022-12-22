import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({ type: 'number', default: 404 })
  statusCode: number;

  @ApiProperty({ type: 'string', default: 'not found' })
  message: string;
}
