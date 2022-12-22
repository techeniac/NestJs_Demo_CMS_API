import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { Newsletter, NewsletterDocument } from '../../mongoose/schemas';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectModel(Newsletter.name)
    private readonly newsletterModel: PaginateModel<NewsletterDocument>,
  ) {}

  /**
   * get all newsletters with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Newsletter>>>
   */
  async findAll(
    searchTerm: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Newsletter>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [{ email: regexSearchTerm }];
    }

    return await this.newsletterModel.paginate(query, paginationQuery);
  }

  /**
   * archive newsletter by id
   * @param id: string
   * @returns Promise<Newsletter>
   */
  async archive(id: string): Promise<Newsletter> {
    return await this.updateNewsletter(id, {
      archivedAt: new Date().toISOString(),
    });
  }

  /**
   * unarchive newsletter by id
   * @param id: string
   * @returns Promise<Newsletter>
   */
  async unarchive(id: string): Promise<Newsletter> {
    return await this.updateNewsletter(id, { archivedAt: null });
  }

  /**
   * bulk archive newsletter by ids
   * @param ids: string[]
   */
  async bulkArchive(ids: string[]) {
    return await this.newsletterModel.updateMany(
      { _id: ids },
      { archivedAt: new Date().toISOString() },
      { new: true },
    );
  }

  /**
   * bulk unarchive newsletter by ids
   * @param ids: string[]
   * @returns Promise<Newsletter>
   */
  async bulkUnarchive(ids: string[]) {
    return await this.newsletterModel.updateMany(
      { _id: ids },
      { archivedAt: null },
      { new: true },
    );
  }

  /**
   * remove newsletter by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.newsletterModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove newsletter by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.newsletterModel.deleteMany({ _id: ids });
  }

  /**
   * find newsletter by id or throw exceptation
   * @param id: string
   * @returns Promise<Newsletter>
   */
  private async findByIdOrFail(id: string): Promise<Newsletter> {
    const newsletter = await this.newsletterModel.findById(id);

    if (!newsletter) throw new NotFoundException('newsletter not found');

    return newsletter;
  }

  /**
   * find newsletter by id or throw exceptation then update newsletter
   * @param id: string
   * @param data: any
   * @returns Promise<Newsletter>
   */
  private async updateNewsletter(id: string, data: any): Promise<Newsletter> {
    await this.findByIdOrFail(id);
    const updated = await this.newsletterModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
    return updated;
  }
}
