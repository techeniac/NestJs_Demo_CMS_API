import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '../../../swagger/types';
import { ContactInquiryCreatedResponse } from './created.type';

export class ContactInquiryGetAllResponse extends PaginationResponse {
  @ApiProperty({
    type: Array<ContactInquiryCreatedResponse>,
    default: [
      {
        id: '637b28ff153a4814cd9b492b',
        firstName: 'first name',
        lastName: 'last name',
        email: 'test@email.com',
        phone: '9876543210',
        subject: 'subject',
        message: 'test message',
        completedAt: null,
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
      {
        id: '637b28ff153a4814cd9b492b',
        firstName: 'first name',
        lastName: 'last name',
        email: 'test@email.com',
        phone: '9876543210',
        subject: 'subject',
        message: 'test message',
        completedAt: null,
        archivedAt: null,
        createdAt: '2022-11-21T09:23:23.169Z',
        updatedAt: '2022-11-21T09:23:23.169Z',
      },
    ],
  })
  docs: ContactInquiryCreatedResponse[];
}
