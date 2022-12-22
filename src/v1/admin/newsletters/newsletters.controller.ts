import {
  Controller,
  Get,
  Body,
  Query,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  NewsletterGetAllResponse,
  NewsletterArchivedResponse,
  NewsletterUnarchivedResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../swagger/types';
import { AdminController } from '../admin.controller';
import { Newsletter } from '../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { PaginationQuery } from '../../mongoose/decorators';

@ApiTags('Admin - Newsletter')
@Controller('v1/admin/newsletters')
export class NewslettersController extends AdminController {
  constructor(private readonly newslettersService: NewslettersService) {
    super();
  }

  /**
   * get all newsletters with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Newsletter>>>
   */
  @ApiOperation({
    summary: 'get all newsletters',
  })
  @ApiOkResponse({
    description: 'success',
    type: NewsletterGetAllResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get()
  async findAll(
    @Query('search') searchTerm: string = '',
    @PaginationQuery() paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Newsletter>>> {
    return await this.newslettersService.findAll(searchTerm, paginationQuery);
  }

  /**
   * archive newsletter by id
   * @method Put
   * @param id: string
   * @returns Promise<Newsletter>
   */
  @ApiOperation({
    summary: 'update single newsletter',
  })
  @ApiOkResponse({
    description: 'success',
    type: NewsletterArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'newsletter not found', type: NotFoundResponse })
  @Put(':id/archive')
  async archive(@Param('id') id: string): Promise<Newsletter> {
    return await this.newslettersService.archive(id);
  }

  /**
   * unarchive newsletter by id
   * @method Put
   * @param id: string
   * @returns Promise<Newsletter>
   */
  @ApiOperation({
    summary: 'update single newsletter',
  })
  @ApiOkResponse({
    description: 'success',
    type: NewsletterUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'newsletter not found', type: NotFoundResponse })
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string): Promise<Newsletter> {
    return await this.newslettersService.unarchive(id);
  }

  /**
   * bulk archive newsletter by ids
   * @method Put
   * @param ids: string[]
   * @returns Promise<Newsletter>
   */
  @ApiOperation({
    summary: 'bulk archive newsletter by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: NewsletterArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'newsletter not found', type: NotFoundResponse })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-archive')
  async blukArchive(@Body('ids') ids: string[]) {
    return await this.newslettersService.bulkArchive(ids);
  }

  /**
   * unarchive newsletter by ids
   * @method Put
   * @param ids: string
   * @returns Promise<Newsletter>
   */
  @ApiOperation({
    summary: 'unarchive newsletter by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: NewsletterUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'newsletter not found', type: NotFoundResponse })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-unarchive')
  async bulkUnarchive(@Body('ids') ids: string[]) {
    return await this.newslettersService.bulkUnarchive(ids);
  }

  /**
   * remove newsletter by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove newsletter',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'newsletter not found', type: NotFoundResponse })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.newslettersService.remove(id);
  }

  /**
   * bulk remove newsletter by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove newsletter',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.newslettersService.bulkRemove(ids);
  }
}
