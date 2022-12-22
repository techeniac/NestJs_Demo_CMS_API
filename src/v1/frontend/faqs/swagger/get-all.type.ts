import { ApiProperty } from '@nestjs/swagger';
import { Faq } from '../../../mongoose/schemas';

export class FaqGetAllResponse {
  @ApiProperty({
    type: Array<Faq>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'faq title',
        description: 'faq description',
        status: '1',
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'faq title',
        description: 'faq description',
        status: '1',
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  data: Faq[];
}
