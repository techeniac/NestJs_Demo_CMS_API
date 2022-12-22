import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ContactInquiry, ContactInquiryDocument } from '../../mongoose/schemas';
import { CreateContactInquiryDto } from './dto';

@Injectable()
export class ContactInquiriesService {
  constructor(
    @InjectModel(ContactInquiry.name)
    private readonly contactInquiryModel: PaginateModel<ContactInquiryDocument>,
  ) {}

  /**
   * store contact inquiry
   * @param createContactInquiryDto: CreateContactInquiryDto
   * @returns Promise<ContactInquiry>
   */
  async create(
    createContactInquiryDto: CreateContactInquiryDto,
    ip: string,
  ): Promise<ContactInquiry> {
    return await this.contactInquiryModel.create({
      ...createContactInquiryDto,
      completedAt: null,
      ip,
    });
  }

}
