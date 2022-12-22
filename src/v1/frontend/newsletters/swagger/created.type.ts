import { ApiProperty } from '@nestjs/swagger';

export class NewsletterCreatedResponse {
  @ApiProperty({ type: 'string', default: '637b28ff153a4814cd9b492b' })
  id: string;

  @ApiProperty({ type: 'string', default: 'test@email.com' })
  email: string;

  @ApiProperty({ type: 'string', default: '' })
  reason: string;

  @ApiProperty({ type: 'string | null', default: null })
  unsubscribedAt: string | null;

  @ApiProperty({ type: 'string | null', default: null })
  archivedAt: string | null;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  createdAt: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  updatedAt: string;
}
