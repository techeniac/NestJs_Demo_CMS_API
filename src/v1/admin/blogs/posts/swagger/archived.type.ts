import { ApiProperty } from '@nestjs/swagger';
import { PostCreatedResponse } from './created.type';

export class PostArchivedResponse extends PostCreatedResponse {
  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  archivedAt: string;
}
