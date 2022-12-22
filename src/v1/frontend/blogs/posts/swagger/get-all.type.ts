import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../../../mongoose/schemas';

export class PostGetAllResponse {
  @ApiProperty({
    type: Array<Post>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'post title',
        description: 'post description',
        status: '1',
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'post title',
        description: 'post description',
        status: '1',
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  data: Post[];
}
