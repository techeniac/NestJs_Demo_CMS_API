import { ApiProperty } from '@nestjs/swagger';
import { NewsletterCreatedResponse } from './created.type';

export class NewsletterUnarchivedResponse extends NewsletterCreatedResponse {
  @ApiProperty({ type: 'null', default: null })
  archivedAt: null;
}