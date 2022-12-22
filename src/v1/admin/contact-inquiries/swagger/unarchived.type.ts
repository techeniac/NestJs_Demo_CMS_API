import { ApiProperty } from '@nestjs/swagger';
import { ContactInquiryCreatedResponse } from './created.type';

export class ContactInquiryUnarchivedResponse extends ContactInquiryCreatedResponse {
  @ApiProperty({ type: 'null', default: null })
  archivedAt: null;
}