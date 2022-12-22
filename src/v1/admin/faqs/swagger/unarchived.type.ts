import { ApiProperty } from '@nestjs/swagger';
import { FaqCreatedResponse } from './created.type';

export class FaqUnarchivedResponse extends FaqCreatedResponse {
  @ApiProperty({ type: 'null', default: null })
  archivedAt: null;
}