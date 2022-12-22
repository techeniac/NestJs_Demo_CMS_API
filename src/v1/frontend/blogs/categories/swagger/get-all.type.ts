import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../../mongoose/schemas';

export class CategoryGetAllResponse {
  @ApiProperty({
    type: Array<Category>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'category title',
        slug: 'category-description',
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'category title',
        slug: 'category-description',
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  data: Category[];
}
