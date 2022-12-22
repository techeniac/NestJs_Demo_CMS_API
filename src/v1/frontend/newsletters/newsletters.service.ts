import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Newsletter, NewsletterDocument } from '../../mongoose/schemas';
import { CreateNewsletterDto, UnsubscribeNewsletterDto } from './dto';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectModel(Newsletter.name)
    private readonly newsletterModel: PaginateModel<NewsletterDocument>,
  ) {}

  /**
   * store newsletter
   * @param createNewsletterDto: CreateNewsletterDto
   * @returns Promise<Newsletter>
   */
  async create(createNewsletterDto: CreateNewsletterDto): Promise<Newsletter> {
    return await this.newsletterModel.findOneAndUpdate(
      {
        ...createNewsletterDto,
      },
      {
        ...createNewsletterDto,
        reason: '',
        unsubscribedAt: null,
        archivedAt: null,
      },
      {
        upsert: true,
        new: true,
      },
    );
  }

  /**
   * unsubscribe newsletter
   * @param id: string
   * @param unsubscribeNewsletterDto: UnsubscribeNewsletterDto
   * @returns Promise<Newsletter>
   */
  async unsubscribe(
    id: string,
    unsubscribeNewsletterDto: UnsubscribeNewsletterDto,
  ): Promise<Newsletter> {
    const newsletter = await this.newsletterModel.findById(id);

    if (!newsletter) throw new NotFoundException('newsletter not found');

    return await this.newsletterModel.findByIdAndUpdate(
      id,
      {
        ...unsubscribeNewsletterDto,
        unsubscribedAt: new Date().toISOString(),
      },
      {
        new: true,
      },
    );
  }
}
