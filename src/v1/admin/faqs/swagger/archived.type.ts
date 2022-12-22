import { ApiProperty } from '@nestjs/swagger';
import { FaqCreatedResponse } from './created.type';

export class FaqArchivedResponse extends FaqCreatedResponse {
  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  archivedAt: string;
}
