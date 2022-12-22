import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto';
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
  TestimonialCreatedResponse,
  TestimonialGetAllResponse,
  TestimonialArchivedResponse,
  TestimonialGetSingleResponse,
  TestimonialUnarchivedResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../swagger/types';
import { AdminController } from '../admin.controller';
import { Testimonial } from '../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../mongoose/dto';
import { PaginationQuery } from '../../mongoose/decorators';
import { testimonialFileUploadConfig } from 'src/v1/config';

@ApiTags('Admin - Testimonial')
@Controller('v1/admin/testimonials')
export class TestimonialsController extends AdminController {
  constructor(private readonly testimonialsService: TestimonialsService) {
    super();
  }

  /**
   * store testimonial
   * @method Post
   * @param createTestimonialDto: CreateTestimonialDto
   * @returns Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'Create testimonial',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TestimonialCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @UseInterceptors(FileInterceptor('image', testimonialFileUploadConfig))
  @Post()
  async create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Testimonial> {
    return await this.testimonialsService.create({
      ...createTestimonialDto,
      image: image ? image.filename : '',
    });
  }

  /**
   * get all testimonials with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, Testimonial>>>
   */
  @ApiOperation({
    summary: 'get all testimonials',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialGetAllResponse,
  })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @ApiQuery({ type: 'number', name: 'limit', required: false })
  @ApiQuery({ type: 'string', name: 'sort', required: false })
  @ApiQuery({ type: 'string', name: 'search', required: false })
  @Get()
  async findAll(
    @Query('search') searchTerm: string = '',
    @PaginationQuery() paginationQuery: PaginationQueryDto,
  ): Promise<PaginateResult<Document<unknown, any, Testimonial>>> {
    return await this.testimonialsService.findAll(searchTerm, paginationQuery);
  }

  /**
   * get single testimonial by id
   * @method Get
   * @param id: string
   * @returns : Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'get single testimonial',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialGetSingleResponse,
  })
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Testimonial> {
    return await this.testimonialsService.findOne(id);
  }

  /**
   * update testimonial by id
   * @param id: string
   * @param updateTestimonialDto: UpdateTestimonialDto
   * @returns Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'update single testimonial',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialGetSingleResponse,
  })
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @UseInterceptors(FileInterceptor('image', testimonialFileUploadConfig))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Testimonial> {
    let data = { ...updateTestimonialDto };
    if (image) {
      data = { ...updateTestimonialDto, image: image.filename };
    }
    return await this.testimonialsService.update(id, data);
  }

  /**
   * archive testimonial by id
   * @method Put
   * @param id: string
   * @returns Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'update single testimonial',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialArchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @Put(':id/archive')
  async archive(@Param('id') id: string): Promise<Testimonial> {
    return await this.testimonialsService.archive(id);
  }

  /**
   * unarchive testimonial by id
   * @method Put
   * @param id: string
   * @returns Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'update single testimonial',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialUnarchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string): Promise<Testimonial> {
    return await this.testimonialsService.unarchive(id);
  }

  /**
   * bulk archive testimonial by ids
   * @method Put
   * @param ids: string[]
   * @returns Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'bulk archive testimonial by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialArchivedResponse,
  })
  // @ApiBody({ type:})
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-archive')
  async blukArchive(@Body('ids') ids: string[]) {
    return await this.testimonialsService.bulkArchive(ids);
  }

  /**
   * unarchive testimonial by ids
   * @method Put
   * @param ids: string
   * @returns Promise<Testimonial>
   */
  @ApiOperation({
    summary: 'unarchive testimonial by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialUnarchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-unarchive')
  async bulkUnarchive(@Body('ids') ids: string[]) {
    return await this.testimonialsService.bulkUnarchive(ids);
  }

  /**
   * remove testimonial by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove testimonial',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({
    description: 'testimonial not found',
    type: NotFoundResponse,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }

  /**
   * bulk remove testimonial by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove testimonial',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.testimonialsService.bulkRemove(ids);
  }
}
