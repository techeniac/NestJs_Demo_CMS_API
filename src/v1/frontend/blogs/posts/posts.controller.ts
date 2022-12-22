import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostGetAllResponse } from './swagger';
import { NotFoundResponse } from '../../../swagger/types';
import { PostGetSingleResponse } from '../../../admin/blogs/posts/swagger';
import { Post } from '../../../mongoose/schemas';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { PaginationQuery } from '../../../mongoose/decorators';

@ApiTags('Frontend - Post')
@Controller('v1/blogs/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * get all posts
   * @method Get
   * @returns
   */
  @ApiOperation({
    summary: 'get all posts',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostGetAllResponse,
  })
  @Get()
  async findAll(@PaginationQuery() paginationQuery: PaginationQueryDto) {
    return await this.postsService.findAll(paginationQuery);
  }

  /**
   * get single post by slug
   * @method Get
   * @param slug: string
   * @returns : Promise<Post>
   */
  @ApiOperation({
    summary: 'get single post',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostGetSingleResponse,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Post> {
    return await this.postsService.findOne(slug);
  }
}
