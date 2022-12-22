import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { Testimonial, TestimonialDocument } from '../../mongoose/schemas';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto';
import { TestimonialStatus } from '../../mongoose/schemas';

@Injectable()
export class TestimonialsService {
  private readonly defaultStatus: TestimonialStatus = TestimonialStatus.ACTIVE;

  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: PaginateModel<TestimonialDocument>,
  ) {}

  /**
   * store testimonial
   * @param createTestimonialDto: CreateTestimonialDto
   * @returns Promise<Testimonial>
   */
  async create(
    createTestimonialDto: CreateTestimonialDto,
  ): Promise<Testimonial> {
    return await this.testimonialModel.create({
      ...createTestimonialDto,
      status: this.defaultStatus,
    });
  }

  /**
   * get all testimonials with pagination
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Testimonial>>>
   */
  async findAll(
    searchTerm: string = '',
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Testimonial>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [
        { fullName: regexSearchTerm },
        { designation: regexSearchTerm },
        { review: regexSearchTerm },
      ];
    }

    return await this.testimonialModel.paginate(query, paginationQuery);
  }

  /**
   * get single testimonial
   * @param id: string
   * @returns Promise<Testimonial>
   */
  async findOne(id: string): Promise<Testimonial> {
    return await this.findByIdOrFail(id);
  }

  /**
   * update testimonial by id
   * @param id: string
   * @param updateTestimonialDto: UpdateTestimonialDto
   * @returns Promise<Testimonial>
   */
  async update(
    id: string,
    updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<Testimonial> {
    return await this.updateTestimonial(id, { ...updateTestimonialDto });
  }

  /**
   * archive testimonial by id
   * @param id: string
   * @returns Promise<Testimonial>
   */
  async archive(id: string): Promise<Testimonial> {
    return await this.updateTestimonial(id, {
      archivedAt: new Date().toISOString(),
    });
  }

  /**
   * unarchive testimonial by id
   * @param id: string
   * @returns Promise<Testimonial>
   */
  async unarchive(id: string): Promise<Testimonial> {
    return await this.updateTestimonial(id, { archivedAt: null });
  }

  /**
   * bulk archive testimonial by ids
   * @param ids: string[]
   */
  async bulkArchive(ids: string[]) {
    return await this.testimonialModel.updateMany(
      { _id: ids },
      { archivedAt: new Date().toISOString() },
      { new: true },
    );
  }

  /**
   * bulk unarchive testimonial by ids
   * @param ids: string[]
   * @returns Promise<Testimonial>
   */
  async bulkUnarchive(ids: string[]) {
    return await this.testimonialModel.updateMany(
      { _id: ids },
      { archivedAt: null },
      { new: true },
    );
  }

  /**
   * remove testimonial by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.testimonialModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove testimonial by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.testimonialModel.deleteMany({ _id: ids });
  }

  /**
   * find testimonial by id or throw exceptation
   * @param id: string
   * @returns Promise<Testimonial>
   */
  private async findByIdOrFail(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialModel.findById(id);

    if (!testimonial) throw new NotFoundException('testimonial not found');

    return testimonial;
  }

  /**
   * find testimonial by id or throw exceptation then update testimonial
   * @param id: string
   * @param data: any
   * @returns Promise<Testimonial>
   */
  private async updateTestimonial(id: string, data: any): Promise<Testimonial> {
    await this.findByIdOrFail(id);
    const updated = await this.testimonialModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
    return updated;
  }
}
