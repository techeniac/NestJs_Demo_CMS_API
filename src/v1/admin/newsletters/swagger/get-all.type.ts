import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../swagger/types';
import { NewsletterCreatedResponse } from './created.type';

export class NewsletterGetAllResponse extends PaginationResponse {
  @ApiProperty({
    type: Array<NewsletterCreatedResponse>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        email: 'test@email.com',
        reason: '',
        unsubscribedAt: null,
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        email: 'test@email.com',
        reason: '',
        unsubscribedAt: null,
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  docs: NewsletterCreatedResponse[];
}
