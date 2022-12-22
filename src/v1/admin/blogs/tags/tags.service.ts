import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { Tag, TagDocument } from '../../../mongoose/schemas';
import { CreateTagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: PaginateModel<TagDocument>,
  ) {}

  /**
   * store tag
   * @param createTagDto: CreateTagDto
   * @returns Promise<Tag>
   */
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagModel.create({
      ...createTagDto,
    });
  }

  /**
   * get all tags with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Tag>>>
   */
  async findAllWithPagination(
    searchTerm: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Tag>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [{ title: regexSearchTerm }];
    }

    return await this.tagModel.paginate(
      query,
      paginationQuery,
    );
  }

    /**
   * get all tags with pagination
   * @param searchTerm: string
   */
    async findAll(
      searchTerm: string,
    ) {
      const query: any = {};
  
      if (searchTerm && searchTerm.length > 0) {
        const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
        query.$or = [{ title: regexSearchTerm }];
      }
      
      return await this.tagModel.find(query);
    }

  /**
   * get single tag
   * @param id: string
   * @returns Promise<Tag>
   */
  async findOne(id: string): Promise<Tag> {
    return await this.findByIdOrFail(id);
  }

  /**
   * update tag by id
   * @param id: string
   * @param updateTagDto: UpdateTagDto
   * @returns Promise<Tag>
   */
  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return await this.updateTag(id, { ...updateTagDto });
  }

  /**
   * remove tag by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.tagModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove tag by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.tagModel.deleteMany({ _id: ids });
  }

  /**
   * find tag by id or throw exceptation
   * @param id: string
   * @returns Promise<Tag>
   */
  private async findByIdOrFail(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id);

    if (!tag) throw new NotFoundException('tag not found');

    return tag;
  }

  /**
   * find tag by id or throw exceptation then update tag
   * @param id: string
   * @param data: any
   * @returns Promise<Tag>
   */
  private async updateTag(id: string, data: any): Promise<Tag> {
    await this.findByIdOrFail(id);
    const updated = await this.tagModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true },
    );
    return updated;
  }
}
