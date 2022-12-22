import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../swagger/types';
import { TestimonialCreatedResponse } from './created.type';

export class TestimonialGetAllResponse extends PaginationResponse {
  @ApiProperty({
    type: Array<TestimonialCreatedResponse>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        fullName: 'fullName',
        designation: 'designation',
        image: 'image.jpg',
        review: 'review',
        status: '1',
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  docs: TestimonialCreatedResponse[];
}
