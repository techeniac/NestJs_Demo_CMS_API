import { ApiProperty } from '@nestjs/swagger';
import { ContactInquiryCreatedResponse } from './created.type';

export class ContactInquiryCompletedResponse extends ContactInquiryCreatedResponse {
  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  completedAt: string;
}
