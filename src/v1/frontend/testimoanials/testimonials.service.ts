import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial, TestimonialDocument, TestimonialStatus } from '../../mongoose/schemas';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: Model<TestimonialDocument>,
  ) {}

  /**
   * get all testimonials with pagination
   * @returns Promise<Testimonial[]>
   */
  async findAll(): Promise<Testimonial[]> {
    return await this.testimonialModel.find({
      status: TestimonialStatus.ACTIVE,
      archivedAt: null,
    });
  }
}
