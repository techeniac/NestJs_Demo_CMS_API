import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({ type: 'number', default: 401 })
  statusCode: number;

  @ApiProperty({ type: 'string', default: 'unauthorized' })
  message: string;
}
