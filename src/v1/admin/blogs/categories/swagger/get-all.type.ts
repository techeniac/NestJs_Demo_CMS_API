import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../../swagger/types';
import { CategoryCreatedResponse } from './created.type';

export class CategoryGetAllResponse extends PaginationResponse {
  @ApiProperty({
    type: Array<CategoryCreatedResponse>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'category',
        slug: 'tag-title',
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'category title',
        slug: 'category-title',
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  docs: CategoryCreatedResponse[];
}
