import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CategoryCreatedResponse,
  CategoryGetAllResponse,
  CategoryGetSingleResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../../swagger/types';
import { AdminController } from '../../admin.controller';
import { Category } from '../../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { PaginationQuery } from '../../../mongoose/decorators';

@ApiTags('Admin - Category')
@Controller('v1/admin/categories')
export class CategoriesController extends AdminController {
  constructor(private readonly categoriesService: CategoriesService) {
    super();
  }

  /**
   * store category
   * @method Post
   * @param createCategoryDto: CreateCategoryDto
   * @returns Promise<Category>
   */
  @ApiOperation({
    summary: 'Create category',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CategoryCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  /**
   * get all categories with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Category>>>
   */
  @ApiOperation({
    summary: 'get all categories',
  })
  @ApiOkResponse({
    description: 'success',
    type: CategoryGetAllResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get()
  async findAllWithPagination(
    @Query('search') searchTerm: string = '',
    @PaginationQuery() paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Category>>> {
    return await this.categoriesService.findAllWithPagination(
      searchTerm,
      paginationQuery,
    );
  }

  /**
   * get all categories with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Category>>>
   */
  @ApiOperation({
    summary: 'get all categories',
  })
  @ApiOkResponse({
    description: 'success',
    type: CategoryGetAllResponse,
  })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get('all')
  async findAll(@Query('search') searchTerm: string = '') {
    return await this.categoriesService.findAll(searchTerm);
  }

  /**
   * get single category by id
   * @method Get
   * @param id: string
   * @returns : Promise<Category>
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
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.findOne(id);
  }

  /**
   * update category by id
   * @param id: string
   * @param updateCategoryDto: UpdateCategoryDto
   * @returns Promise<Category>
   */
  @ApiOperation({
    summary: 'update single category',
  })
  @ApiOkResponse({
    description: 'success',
    type: CategoryGetSingleResponse,
  })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: NotFoundResponse,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  /**
   * remove category by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove category',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({
    description: 'category not found',
    type: NotFoundResponse,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  /**
   * bulk remove category by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove category',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.categoriesService.bulkRemove(ids);
  }
}
