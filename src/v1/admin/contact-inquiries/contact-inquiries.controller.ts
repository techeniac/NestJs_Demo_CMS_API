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
  Ip,
} from '@nestjs/common';
import { ContactInquiriesService } from './contact-inquiries.service';
import { CreateContactInquiryDto, UpdateContactInquiryDto } from './dto';
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
  ContactInquiryCreatedResponse,
  ContactInquiryGetAllResponse,
  ContactInquiryArchivedResponse,
  ContactInquiryGetSingleResponse,
  ContactInquiryUnarchivedResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../swagger/types';
import { AdminController } from '../admin.controller';
import { ContactInquiry } from '../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { PaginationQuery } from '../../mongoose/decorators';

@ApiTags('Admin - ContactInquiry')
@Controller('v1/admin/contact-inquiries')
export class ContactInquiriesController extends AdminController {
  constructor(private readonly contactInquiriesService: ContactInquiriesService) {
    super();
  }

  /**
   * store contact inquiry
   * @method Post
   * @param createContactInquiryDto: CreateContactInquiryDto
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'Create contact inquiry',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: ContactInquiryCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post()
  async create(@Body() createContactInquiryDto: CreateContactInquiryDto, @Ip() ip: string): Promise<ContactInquiry> {
    return await this.contactInquiriesService.create(createContactInquiryDto, ip);
  }

  /**
   * get all contact inquiries with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, ContactInquiry>>>
   */
  @ApiOperation({
    summary: 'get all contact inquiries',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryGetAllResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get()
  async findAll(
    @Query('search') searchTerm: string = '',
    @PaginationQuery() paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, ContactInquiry>>> {
    return await this.contactInquiriesService.findAll(searchTerm, paginationQuery);
  }

  /**
   * get single contact inquiry by id
   * @method Get
   * @param id: string
   * @returns : Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'get single contact inquiry',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryGetSingleResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContactInquiry> {
    return await this.contactInquiriesService.findOne(id);
  }

  /**
   * update contact inquiry by id
   * @param id: string
   * @param updateContactInquiryDto: UpdateContactInquiryDto
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'update single contact inquiry',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryGetSingleResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactInquiryDto: UpdateContactInquiryDto,
  ): Promise<ContactInquiry> {
    return await this.contactInquiriesService.update(id, updateContactInquiryDto);
  }

  /**
   * archive contact inquiry by id
   * @method Put
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'update single contact inquiry',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Put(':id/archive')
  async archive(@Param('id') id: string): Promise<ContactInquiry> {
    return await this.contactInquiriesService.archive(id);
  }

  /**
   * unarchive contact inquiry by id
   * @method Put
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'update single contact inquiry',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string): Promise<ContactInquiry> {
    return await this.contactInquiriesService.unarchive(id);
  }

  /**
   * mark as completed contact inquiry by id
   * @method Put
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
   @ApiOperation({
    summary: 'mark as completed contact inquiry',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Put(':id/completed')
  async completed(@Param('id') id: string): Promise<ContactInquiry> {
    return await this.contactInquiriesService.completed(id);
  }

  /**
   * mark as pending contact inquiry by id
   * @method Put
   * @param id: string
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'mark as pending contact inquiry',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Put(':id/pending')
  async pending(@Param('id') id: string): Promise<ContactInquiry> {
    return await this.contactInquiriesService.pending(id);
  }

  /**
   * bulk archive contact inquiry by ids
   * @method Put
   * @param ids: string[]
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'bulk archive contact inquiry by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryArchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Put('bulk-archive')
  async blukArchive(@Body('ids') ids: string[]) {
    return await this.contactInquiriesService.bulkArchive(ids);
  }

  /**
   * unarchive contact inquiry by ids
   * @method Put
   * @param ids: string
   * @returns Promise<ContactInquiry>
   */
  @ApiOperation({
    summary: 'unarchive contact inquiry by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: ContactInquiryUnarchivedResponse,
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Put('bulk-unarchive')
  async bulkUnarchive(@Body('ids') ids: string[]) {
    return await this.contactInquiriesService.bulkUnarchive(ids);
  }

  /**
   * remove contact inquiry by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove contact inquiry',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'contact inquiry not found', type: NotFoundResponse })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.contactInquiriesService.remove(id);
  }

  /**
   * bulk remove contact inquiry by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove contact inquiry',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.contactInquiriesService.bulkRemove(ids);
  }
}
