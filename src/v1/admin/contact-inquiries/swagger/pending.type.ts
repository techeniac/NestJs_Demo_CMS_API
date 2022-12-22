import { ApiProperty } from '@nestjs/swagger';
import { ContactInquiryCreatedResponse } from './created.type';

export class ContactInquiryPendingResponse extends ContactInquiryCreatedResponse {
  @ApiProperty({ type: null, default: null })
  completedAt: null;
}
