import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { ContactInquiry, ContactInquiryDocument } from '../../mongoose/schemas';
import { CreateContactInquiryDto, UpdateContactInquiryDto } from './dto';

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

  /**
   * get all contact inquiries with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, ContactInquiry>>>
   */
  async findAll(
    searchTerm: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, ContactInquiry>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [
        { firstName: regexSearchTerm },
        { lastName: regexSearchTerm },
        { email: regexSearchTerm },
        { phone: regexSearchTerm },
        { subject: regexSearchTerm },
        { message: regexSearchTerm },
      ];
    }

    return await this.contactInquiryModel.paginate(query, paginationQuery);
  }

  /**
   * get single contact inquiry
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  async findOne(id: string): Promise<ContactInquiry> {
    return await this.findByIdOrFail(id);
  }

  /**
   * update contact inquiry by id
   * @param id: string
   * @param updateContactInquiryDto: UpdateContactInquiryDto
   * @returns Promise<ContactInquiry>
   */
  async update(
    id: string,
    updateContactInquiryDto: UpdateContactInquiryDto,
  ): Promise<ContactInquiry> {
    return await this.updateContactInquiry(id, { ...updateContactInquiryDto });
  }

  /**
   * archive contact inquiry by id
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  async archive(id: string): Promise<ContactInquiry> {
    return await this.updateContactInquiry(id, {
      archivedAt: new Date().toISOString(),
    });
  }

  /**
   * unarchive contact inquiry by id
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  async unarchive(id: string): Promise<ContactInquiry> {
    return await this.updateContactInquiry(id, { archivedAt: null });
  }

  /**
   * mark as completed contact inquiry by id
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  async completed(id: string): Promise<ContactInquiry> {
    return await this.updateContactInquiry(id, {
      completedAt: new Date().toISOString(),
    });
  }

  /**
   * mark as pending contact inquiry by id
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  async pending(id: string): Promise<ContactInquiry> {
    return await this.updateContactInquiry(id, { completedAt: null });
  }

  /**
   * bulk archive contact inquiry by ids
   * @param ids: string[]
   */
  async bulkArchive(ids: string[]) {
    return await this.contactInquiryModel.updateMany(
      { _id: ids },
      { archivedAt: new Date().toISOString() },
      { new: true },
    );
  }

  /**
   * bulk unarchive contact inquiry by ids
   * @param ids: string[]
   * @returns Promise<ContactInquiry>
   */
  async bulkUnarchive(ids: string[]) {
    return await this.contactInquiryModel.updateMany(
      { _id: ids },
      { archivedAt: null },
      { new: true },
    );
  }

  /**
   * remove contact inquiry by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.contactInquiryModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove contact inquiry by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.contactInquiryModel.deleteMany({ _id: ids });
  }

  /**
   * find contact inquiry by id or throw exceptation
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  private async findByIdOrFail(id: string): Promise<ContactInquiry> {
    const contactInquiry = await this.contactInquiryModel.findById(id);

    if (!contactInquiry)
      throw new NotFoundException('contact inquiry not found');

    return contactInquiry;
  }

  /**
   * find contact inquiry by id or throw exceptation then update contact inquiry
   * @param id: string
   * @param data: any
   * @returns Promise<ContactInquiry>
   */
  private async updateContactInquiry(
    id: string,
    data: any,
  ): Promise<ContactInquiry> {
    await this.findByIdOrFail(id);
    const updated = await this.contactInquiryModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
    return updated;
  }
}
