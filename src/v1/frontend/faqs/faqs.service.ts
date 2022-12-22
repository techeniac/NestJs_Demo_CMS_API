import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument, FaqStatus } from '../../mongoose/schemas';

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel(Faq.name)
    private readonly faqModel: Model<FaqDocument>,
  ) {}

  /**
   * get all faqs with pagination
   * @returns Promise<Faq[]>
   */
  async findAll(): Promise<Faq[]> {
    return await this.faqModel.find({
      status: FaqStatus.ACTIVE,
      archivedAt: null,
    });
  }
}
