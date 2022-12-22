import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TagGetAllResponse } from './swagger';
import { TagGetSingleResponse } from '../../../admin/blogs/tags/swagger';
import { NotFoundResponse } from '../../../swagger/types';
import { PaginationQuery } from '../../../mongoose/decorators';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { PostsService } from '../posts/posts.service';

@ApiTags('Frontend - Blogs Tags')
@Controller('v1/blogs/tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly postsService: PostsService,
  ) {}

  /**
   * get all tags
   * @method Get
   * @returns
   */
  @ApiOperation({
    summary: 'get all tags',
  })
  @ApiOkResponse({
    description: 'success',
    type: TagGetAllResponse,
  })
  @Get()
  async findAll() {
    return { data: await this.tagsService.findAll() };
  }

  /**
   * get single category by slug
   */
  @ApiOperation({
    summary: 'get single category',
  })
  @ApiOkResponse({
    description: 'success',
    type: TagGetSingleResponse,
  })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: NotFoundResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @Get(':slug')
  async findOne(
    @Param('slug') slug: string,
    @PaginationQuery() paginationQuery: PaginationQueryDto,
  ) {
    const tag = await this.tagsService.findOne(slug);

    const posts = await this.postsService.findByTagId(tag.id, paginationQuery);

    return {
      tag,
      posts,
    };
  }
}
