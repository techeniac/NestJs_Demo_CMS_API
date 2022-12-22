import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationQueryDto } from 'src/v1/mongoose/dto';
import { Post, PostDocument, PostStatus } from '../../../mongoose/schemas';

@Injectable()
export class PostsService {
  private readonly populateModals: string[] = ['tags', 'categories'];

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: PaginateModel<PostDocument>,
  ) {}

  /**
   * get all posts with pagination
   * @returns Promise<Post[]>
   */
  async findAll(paginationQuery: PaginationQueryDto) {
    return await this.postModel.paginate(
      {
        status: PostStatus.PUBLISHED,
        archivedAt: null,
      },
      {
        ...paginationQuery,
        populate: this.populateModals,
      },
    );
  }

  /**
   * get single post
   * @param id: string
   * @returns Promise<Post>
   */
  async findOne(slug: string): Promise<Post> {
    const post = await this.postModel
      .findOne({
        slug,
        status: PostStatus.PUBLISHED,
        archivedAt: null,
      })
      .populate(this.populateModals);

    if (!post) throw new NotFoundException('post not found');

    return post;
  }

  /**
   * get single post
   * @param id: string
   * @returns Promise<Post>
   */
  async findByCategoryId(id: string, paginationQuery: PaginationQueryDto) {
    const post = await this.postModel.paginate(
      {
        categories: {
          $in: id,
        },
      },
      {
        ...paginationQuery,
        populate: this.populateModals,
      },
    );

    if (!post) throw new NotFoundException('post not found');

    return post;
  }

  /**
   * get single post
   * @param id: string
   * @returns Promise<Post>
   */
  async findByTagId(id: string, paginationQuery: PaginationQueryDto) {
    const post = await this.postModel.paginate(
      {
        tags: {
          $in: id,
        },
      },
      {
        ...paginationQuery,
        populate: this.populateModals,
      },
    );

    if (!post) throw new NotFoundException('post not found');

    return post;
  }
}
