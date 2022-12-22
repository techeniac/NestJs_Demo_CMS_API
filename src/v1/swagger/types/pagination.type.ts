import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse {
  @ApiProperty({ type: 'number', default: 30 })
  total: number;

  @ApiProperty({ type: 'number', default: 10 })
  limit: number;

  @ApiProperty({ type: 'number', default: 0 })
  offset: number;

  @ApiProperty({ type: 'number', default: 1 })
  page: number;

  @ApiProperty({ type: 'number', default: 3 })
  pages: number;
}
