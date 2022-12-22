import { ApiProperty } from '@nestjs/swagger';

export class ContactInquiryCreatedResponse {
  @ApiProperty({ type: 'string', default: '637b28ff153a4814cd9b492b' })
  id: string;

  @ApiProperty({ type: 'string', default: 'first name' })
  firstName: string;

  @ApiProperty({ type: 'string', default: 'last name' })
  lastName: string;

  @ApiProperty({ type: 'string', default: 'test@email.com' })
  email: string;

  @ApiProperty({ type: 'string', default: '9876543210' })
  phone: string;

  @ApiProperty({ type: 'string', default: 'subject' })
  subject: string;

  @ApiProperty({ type: 'string', default: 'test message' })
  message: string;

  @ApiProperty({ type: 'string', default: '192.168.125.102' })
  ip: string;

  @ApiProperty({ type: 'string | null', default: null })
  completedAt: string | null;

  @ApiProperty({ type: 'string | null', default: null })
  archivedAt: string | null;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  createdAt: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  updatedAt: string;
}
