import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../../swagger/types';
import { PostCreatedResponse } from './created.type';

export class PostGetAllResponse extends PaginationResponse {
  @ApiProperty({
    type: Array<PostCreatedResponse>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'faq title',
        slug: 'faq-description',
        excerpt: '',
        content: '',
        image: '',
        tags: [],
        categories: [],
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        headerContent: '',
        status: 1,
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        title: 'faq title',
        slug: 'faq-description',
        excerpt: '',
        content: '',
        image: '',
        tags: [],
        categories: [],
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        headerContent: '',
        status: 1,
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  docs: PostCreatedResponse[];
}
