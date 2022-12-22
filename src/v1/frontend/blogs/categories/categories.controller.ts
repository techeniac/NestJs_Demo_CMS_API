import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryGetAllResponse } from './swagger';
import { CategoryGetSingleResponse } from '../../../admin/blogs/categories/swagger';
import { NotFoundResponse } from '../../../swagger/types';
import { PostsService } from '../posts/posts.service';
import { PaginationQuery } from '../../../mongoose/decorators';
import { PaginationQueryDto } from '../../../mongoose/dto';

@ApiTags('Frontend - Blog Category')
@Controller('v1/blogs/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  /**
   * get all categories
   * @method Get
   * @returns
   */
  @ApiOperation({
    summary: 'get all categories',
  })
  @ApiOkResponse({
    description: 'success',
    type: CategoryGetAllResponse,
  })
  @Get()
  async findAll() {
    return { data: await this.categoriesService.findAll() };
  }

  /**
   * get single category by slug
   */
  @ApiOperation({
    summary: 'get single category',
  })
  @ApiOkResponse({
    description: 'success',
    type: CategoryGetSingleResponse,
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
    const category = await this.categoriesService.findOne(slug);

    const posts = await this.postsService.findByCategoryId(
      category.id,
      paginationQuery,
    );

    return {
      category,
      posts,
    };
  }
}
