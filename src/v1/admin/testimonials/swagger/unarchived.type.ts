import { ApiProperty } from '@nestjs/swagger';
import { TestimonialCreatedResponse } from './created.type';

export class TestimonialUnarchivedResponse extends TestimonialCreatedResponse {
  @ApiProperty({ type: 'null', default: null })
  archivedAt: null;
}