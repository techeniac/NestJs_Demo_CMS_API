import { ApiProperty } from '@nestjs/swagger';
import { FaqStatus } from '../../../mongoose/schemas';

export class FaqCreatedResponse {
  @ApiProperty({ type: 'string', default: '637b28ff153a4814cd9b492b' })
  id: string;

  @ApiProperty({ type: 'string', default: 'faq title' })
  title: string;

  @ApiProperty({ type: 'string', default: 'faq description' })
  description: string;

  @ApiProperty({ enum: FaqStatus, default: 1 })
  status: FaqStatus;

  @ApiProperty({ type: 'string | null', default: null })
  archivedAt: string | null;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  createdAt: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  updatedAt: string;
}
