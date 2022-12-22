import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { FilterQueryDto } from 'src/v1/mongoose/dto/filter-query.dto';
import { PaginationQueryDto } from '../../mongoose/dto';
import { Faq, FaqDocument, FaqStatus } from '../../mongoose/schemas';
import { CreateFaqDto, UpdateFaqDto } from './dto';

@Injectable()
export class FaqsService {
  private readonly defaultStatus: FaqStatus = FaqStatus.ACTIVE;

  constructor(
    @InjectModel(Faq.name)
    private readonly faqModel: PaginateModel<FaqDocument>,
  ) {}

  /**
   * store faq
   * @param createFaqDto: CreateFaqDto
   * @returns Promise<Faq>
   */
  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    return await this.faqModel.create({
      ...createFaqDto,
      status: this.defaultStatus,
    });
  }

  /**
   * get all faqs with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Faq>>>
   */
  async findAll(
    searchTerm: string,
    paginationQuery: PaginationQueryDto,
    filterQuery: FilterQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Faq>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [
        { title: regexSearchTerm },
        { description: regexSearchTerm },
      ];
    }

    if (filterQuery.filters.length > 0) {
      console.log('filterQuery.filter', filterQuery.filters);
      query.$and = filterQuery.filters.map((filter, index) => {
        const obj: any = {};
        obj[`${Object.keys(filter)[0]}`] = { $eq: Object.values(filter)[0] };
        return { ...obj };
      });
    }
    
    return await this.faqModel.paginate(
      query,
      paginationQuery,
    );
  }

  /**
   * get single faq
   * @param id: string
   * @returns Promise<Faq>
   */
  async findOne(id: string): Promise<Faq> {
    return await this.findByIdOrFail(id);
  }

  /**
   * update faq by id
   * @param id: string
   * @param updateFaqDto: UpdateFaqDto
   * @returns Promise<Faq>
   */
  async update(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    return await this.updateFaq(id, { ...updateFaqDto });
  }

  /**
   * archive faq by id
   * @param id: string
   * @returns Promise<Faq>
   */
  async archive(id: string): Promise<Faq> {
    return await this.updateFaq(id, { archivedAt: new Date().toISOString() });
  }

  /**
   * unarchive faq by id
   * @param id: string
   * @returns Promise<Faq>
   */
  async unarchive(id: string): Promise<Faq> {
    return await this.updateFaq(id, { archivedAt: null });
  }

  /**
   * bulk archive faq by ids
   * @param ids: string[]
   */
  async bulkArchive(ids: string[]) {
    return await this.faqModel.updateMany(
      { _id: ids },
      { archivedAt: new Date().toISOString() },
      { new: true },
    );
  }

  /**
   * bulk unarchive faq by ids
   * @param ids: string[]
   * @returns Promise<Faq>
   */
  async bulkUnarchive(ids: string[]) {
    return await this.faqModel.updateMany(
      { _id: ids },
      { archivedAt: null },
      { new: true },
    );
  }

  /**
   * remove faq by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.faqModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove faq by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.faqModel.deleteMany({ _id: ids });
  }

  /**
   * find faq by id or throw exceptation
   * @param id: string
   * @returns Promise<Faq>
   */
  private async findByIdOrFail(id: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id);

    if (!faq) throw new NotFoundException('faq not found');

    return faq;
  }

  /**
   * find faq by id or throw exceptation then update faq
   * @param id: string
   * @param data: any
   * @returns Promise<Faq>
   */
  private async updateFaq(id: string, data: any): Promise<Faq> {
    await this.findByIdOrFail(id);
    const updated = await this.faqModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
    return updated;
  }
}
