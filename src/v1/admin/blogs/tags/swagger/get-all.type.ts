import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../../swagger/types';
import { TagCreatedResponse } from './created.type';

export class TagGetAllResponse extends PaginationResponse {
  @ApiProperty({
    type: Array<TagCreatedResponse>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'tag title',
        slug: 'tag-title',
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'tag title',
        slug: 'tag-title',
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  docs: TagCreatedResponse[];
}
