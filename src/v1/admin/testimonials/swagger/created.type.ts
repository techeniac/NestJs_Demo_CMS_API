import { ApiProperty } from '@nestjs/swagger';
import { TestimonialStatus } from '../../../mongoose/schemas';

export class TestimonialCreatedResponse {
  @ApiProperty({ type: 'string', default: '637b28ff153a4814cd9b492b' })
  id: string;

  @ApiProperty({ type: 'string', default: 'full name' })
  fullName: string;

  @ApiProperty({ type: 'string', default: 'image.jpg' })
  designation: string;

  @ApiProperty({ type: 'string', default: 'designation.jpg' })
  image: string;

  @ApiProperty({ type: 'string', default: 'https://domain.com/path/image.jpg' })
  imageUrl: string;

  @ApiProperty({ type: 'string', default: 'review' })
  review: string;

  @ApiProperty({ enum: TestimonialStatus, default: 1 })
  status: TestimonialStatus;

  @ApiProperty({ type: 'string | null', default: null })
  archivedAt: string | null;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  createdAt: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  updatedAt: string;
}
