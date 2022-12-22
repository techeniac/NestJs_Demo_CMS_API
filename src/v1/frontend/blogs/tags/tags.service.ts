import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../../../mongoose/schemas';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<TagDocument>,
  ) {}

  /**
   * get all tags with pagination
   * @returns Promise<Tag[]>
   */
  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find();
  }

  /**
   * get single tag
   * @param id: string
   * @returns Promise<Category>
   */
  async findOne(slug: string) {
    const tag = await this.tagModel.findOne({ slug });

    if (!tag) throw new NotFoundException('tag not found');

    return tag;
  }
}
