import { ApiProperty } from '@nestjs/swagger';
import { PostCreatedResponse } from './created.type';

export class PostUnarchivedResponse extends PostCreatedResponse {
  @ApiProperty({ type: 'null', default: null })
  archivedAt: null;
}