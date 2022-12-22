import { ApiProperty } from '@nestjs/swagger';
import { Testimonial } from '../../../mongoose/schemas';

export class TestimonialGetAllResponse {
  @ApiProperty({
    type: Array<Testimonial>,
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
  data: Testimonial[];
}
