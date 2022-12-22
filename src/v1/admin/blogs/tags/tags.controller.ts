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
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
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
  TagCreatedResponse,
  TagGetAllResponse,
  TagGetSingleResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../../swagger/types';
import { AdminController } from '../../admin.controller';
import { Tag } from '../../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { PaginationQuery } from '../../../mongoose/decorators';

@ApiTags('Admin - Tag')
@Controller('v1/admin/tags')
export class TagsController extends AdminController {
  constructor(private readonly tagsService: TagsService) {
    super();
  }

  /**
   * store tag
   * @method Post
   * @param createTagDto: CreateTagDto
   * @returns Promise<Tag>
   */
  @ApiOperation({
    summary: 'Create tag',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TagCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagsService.create(createTagDto);
  }

  /**
   * get all tags with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Tag>>>
   */
  @ApiOperation({
    summary: 'get all tags',
  })
  @ApiOkResponse({
    description: 'success',
    type: TagGetAllResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get()
  async findAllWithPagination(
    @Query('search') searchTerm: string = '',
    @PaginationQuery() paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Tag>>> {
    return await this.tagsService.findAllWithPagination(
      searchTerm,
      paginationQuery,
    );
  }

  /**
   * get all tags with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Tag>>>
   */
  @ApiOperation({
    summary: 'get all tags',
  })
  @ApiOkResponse({
    description: 'success',
    type: TagGetAllResponse,
  })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get('all')
  async findAll(@Query('search') searchTerm: string = '') {
    return await this.tagsService.findAll(searchTerm);
  }

  /**
   * get single tag by id
   * @method Get
   * @param id: string
   * @returns : Promise<Tag>
   */
  @ApiOperation({
    summary: 'get single tag',
  })
  @ApiOkResponse({
    description: 'success',
    type: TagGetSingleResponse,
  })
  @ApiNotFoundResponse({ description: 'tag not found', type: NotFoundResponse })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tag> {
    return await this.tagsService.findOne(id);
  }

  /**
   * update tag by id
   * @param id: string
   * @param updateTagDto: UpdateTagDto
   * @returns Promise<Tag>
   */
  @ApiOperation({
    summary: 'update single tag',
  })
  @ApiOkResponse({
    description: 'success',
    type: TagGetSingleResponse,
  })
  @ApiNotFoundResponse({ description: 'tag not found', type: NotFoundResponse })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagsService.update(id, updateTagDto);
  }

  /**
   * remove tag by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove tag',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'tag not found', type: NotFoundResponse })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }

  /**
   * bulk remove tag by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove tag',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.tagsService.bulkRemove(ids);
  }
}
