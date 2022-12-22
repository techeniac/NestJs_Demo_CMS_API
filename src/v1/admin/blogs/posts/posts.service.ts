import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { FilterQueryDto } from '../../../mongoose/dto/filter-query.dto';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { Post, PostDocument, PostStatus } from '../../../mongoose/schemas';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  private readonly defaultStatus: PostStatus = PostStatus.PUBLISHED;
  private readonly populate: string[] = ['tags', 'categories'];

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: PaginateModel<PostDocument>,
  ) {}

  /**
   * store post
   * @param createPostDto: CreatePostDto
   * @returns Promise<Post>
   */
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postModel.create({
      ...createPostDto,
      status: this.defaultStatus,
    });
    return post.populate(this.populate);
  }

  /**
   * get all posts with pagination
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Post>>>
   */
  async findAll(
    searchTerm: string,
    paginationQuery: PaginationQueryDto,
    filterQuery: FilterQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Post>>> {
    const query: any = {};

    if (searchTerm && searchTerm.length > 0) {
      const regexSearchTerm = { $regex: new RegExp(searchTerm), $options: 'i' };
      query.$or = [
        { title: regexSearchTerm },
        { excerpt: regexSearchTerm },
        { content: regexSearchTerm },
      ];
    }

    if (filterQuery.filters.length > 0) {
      query.$and = filterQuery.filters.map((filter, index) => {
        const obj: any = {};
        obj[`${Object.keys(filter)[0]}`] = { $eq: Object.values(filter)[0] };
        return { ...obj };
      });
    }

    return await this.postModel.paginate(query, {
      ...paginationQuery,
      populate: this.populate,
    });
  }

  /**
   * get single post
   * @param id: string
   * @returns Promise<Post>
   */
  async findOne(id: string): Promise<Post> {
    return await this.findByIdOrFail(id);
  }

  /**
   * update post by id
   * @param id: string
   * @param updatePostDto: UpdatePostDto
   * @returns Promise<Post>
   */
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.updatePost(id, { ...updatePostDto });
  }

  /**
   * archive post by id
   * @param id: string
   * @returns Promise<Post>
   */
  async archive(id: string): Promise<Post> {
    return await this.updatePost(id, { archivedAt: new Date().toISOString() });
  }

  /**
   * unarchive post by id
   * @param id: string
   * @returns Promise<Post>
   */
  async unarchive(id: string): Promise<Post> {
    return await this.updatePost(id, { archivedAt: null });
  }

  /**
   * bulk archive post by ids
   * @param ids: string[]
   */
  async bulkArchive(ids: string[]) {
    return await this.postModel.updateMany(
      { _id: ids },
      { archivedAt: new Date().toISOString() },
      {
        new: true,
        populate: this.populate,
      },
    );
  }

  /**
   * bulk unarchive post by ids
   * @param ids: string[]
   * @returns Promise<Post>
   */
  async bulkUnarchive(ids: string[]) {
    return await this.postModel.updateMany(
      { _id: ids },
      { archivedAt: null },
      {
        new: true,
        populate: this.populate,
      },
    );
  }

  /**
   * remove post by id
   * @param id:string
   * @return Promise<void>
   */
  async remove(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    await this.postModel.deleteOne({ _id: id });
  }

  /**
   * bulk remove post by ids
   * @param ids:string[]
   * @return Promise<void>
   */
  async bulkRemove(ids: string[]): Promise<void> {
    await this.postModel.deleteMany({ _id: ids });
  }

  /**
   * find post by id or throw exceptation
   * @param id: string
   * @returns Promise<Post>
   */
  private async findByIdOrFail(id: string): Promise<Post> {
    const post = await this.postModel.findById(id);

    if (!post) throw new NotFoundException('post not found');

    return post;
  }

  /**
   * find post by id or throw exceptation then update post
   * @param id: string
   * @param data: any
   * @returns Promise<Post>
   */
  private async updatePost(id: string, data: any): Promise<Post> {
    await this.findByIdOrFail(id);
    const updated = await this.postModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      {
        new: true,
        populate: this.populate,
      },
    );
    return updated;
  }
}
