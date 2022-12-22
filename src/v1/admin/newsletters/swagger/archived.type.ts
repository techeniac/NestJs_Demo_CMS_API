import { ApiProperty } from '@nestjs/swagger';
import { NewsletterCreatedResponse } from './created.type';

export class NewsletterArchivedResponse extends NewsletterCreatedResponse {
  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  archivedAt: string;
}
