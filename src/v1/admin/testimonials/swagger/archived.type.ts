import { ApiProperty } from '@nestjs/swagger';
import { TestimonialCreatedResponse } from './created.type';

export class TestimonialArchivedResponse extends TestimonialCreatedResponse {
  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  archivedAt: string;
}
