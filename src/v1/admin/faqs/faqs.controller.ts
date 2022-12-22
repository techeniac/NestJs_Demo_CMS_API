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
import { FaqsService } from './faqs.service';
import { CreateFaqDto, UpdateFaqDto } from './dto';
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
  FaqCreatedResponse,
  FaqGetAllResponse,
  FaqArchivedResponse,
  FaqGetSingleResponse,
  FaqUnarchivedResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../swagger/types';
import { AdminController } from '../admin.controller';
import { Faq } from '../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { PaginationQuery } from '../../mongoose/decorators';
import { FilterQuery } from 'src/v1/mongoose/decorators/filter-query.decorator';
import { FilterQueryDto } from 'src/v1/mongoose/dto/filter-query.dto';

@ApiTags('Admin - Faq')
@Controller('v1/admin/faqs')
export class FaqsController extends AdminController {
  constructor(private readonly faqsService: FaqsService) {
    super();
  }

  /**
   * store faq
   * @method Post
   * @param createFaqDto: CreateFaqDto
   * @returns Promise<Faq>
   */
  @ApiOperation({
    summary: 'Create faq',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: FaqCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post()
  async create(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return await this.faqsService.create(createFaqDto);
  }

  /**
   * get all faqs with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Faq>>>
   */
  @ApiOperation({
    summary: 'get all faqs',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqGetAllResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get()
  async findAll(
    @Query('search') searchTerm: string = '',
    @PaginationQuery() paginationQuery: PaginationQueryDto,
    @FilterQuery() filterQuery: FilterQueryDto
  ): Promise<PaginateResult<Document<unknown, any, Faq>>> {
    return await this.faqsService.findAll(searchTerm, paginationQuery, filterQuery);
  }

  /**
   * get single faq by id
   * @method Get
   * @param id: string
   * @returns : Promise<Faq>
   */
  @ApiOperation({
    summary: 'get single faq',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqGetSingleResponse,
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Faq> {
    return await this.faqsService.findOne(id);
  }

  /**
   * update faq by id
   * @param id: string
   * @param updateFaqDto: UpdateFaqDto
   * @returns Promise<Faq>
   */
  @ApiOperation({
    summary: 'update single faq',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqGetSingleResponse,
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ) {
    return await this.faqsService.update(id, updateFaqDto);
  }

  /**
   * archive faq by id
   * @method Put
   * @param id: string
   * @returns Promise<Faq>
   */
  @ApiOperation({
    summary: 'update single faq',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @Put(':id/archive')
  async archive(@Param('id') id: string) {
    return await this.faqsService.archive(id);
  }

  /**
   * unarchive faq by id
   * @method Put
   * @param id: string
   * @returns Promise<Faq>
   */
  @ApiOperation({
    summary: 'update single faq',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    return await this.faqsService.unarchive(id);
  }

  /**
   * bulk archive faq by ids
   * @method Put
   * @param ids: string[]
   * @returns Promise<Faq>
   */
  @ApiOperation({
    summary: 'bulk archive faq by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-archive')
  async blukArchive(@Body('ids') ids: string[]) {
    return await this.faqsService.bulkArchive(ids);
  }

  /**
   * unarchive faq by ids
   * @method Put
   * @param ids: string
   * @returns Promise<Faq>
   */
  @ApiOperation({
    summary: 'unarchive faq by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-unarchive')
  async bulkUnarchive(@Body('ids') ids: string[]) {
    return await this.faqsService.bulkUnarchive(ids);
  }

  /**
   * remove faq by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove faq',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'faq not found', type: NotFoundResponse })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.faqsService.remove(id);
  }

  /**
   * bulk remove faq by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove faq',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.faqsService.bulkRemove(ids);
  }
}
