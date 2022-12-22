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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
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
  PostCreatedResponse,
  PostGetAllResponse,
  PostArchivedResponse,
  PostGetSingleResponse,
  PostUnarchivedResponse,
} from './swagger';
import { BulkActionBody, NotFoundResponse } from '../../../swagger/types';
import { AdminController } from '../../admin.controller';
import { Post as BlogPost } from '../../../mongoose/schemas';
import { Document, PaginateResult } from 'mongoose';
import { PaginationQueryDto } from '../../../mongoose/dto';
import { PaginationQuery } from '../../../mongoose/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { postFileUploadConfig } from '../../../config';
import { FilterQueryDto } from 'src/v1/mongoose/dto/filter-query.dto';
import { FilterQuery } from 'src/v1/mongoose/decorators/filter-query.decorator';

@ApiTags('Admin - Post')
@Controller('v1/admin/posts')
export class PostsController extends AdminController {
  constructor(private readonly postsService: PostsService) {
    super();
  }

  /**
   * store post
   * @method Post
   * @param createPostDto: CreatePostDto
   * @returns Promise<BlogPost>
   */
  @ApiOperation({
    summary: 'Create post',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: PostCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @UseInterceptors(FileInterceptor('image', postFileUploadConfig))
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<BlogPost> {
    return await this.postsService.create({
      ...createPostDto,
      image: image ? image.filename : '',
    });
  }

  /**
   * get all posts with pagination
   * @method Get
   * @param searchTerm: string
   * @param paginationQuery: PaginationQueryDto
   * @returns Promise<PaginateResult<Document<unknown, any, BlogPost>>>
   */
  @ApiOperation({
    summary: 'get all posts',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostGetAllResponse,
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
  ): Promise<PaginateResult<Document<unknown, any, BlogPost>>> {
    return await this.postsService.findAll(searchTerm, paginationQuery, filterQuery);
  }

  /**
   * get single post by id
   * @method Get
   * @param id: string
   * @returns : Promise<BlogPost>
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
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    return await this.postsService.findOne(id);
  }

  /**
   * update post by id
   * @param id: string
   * @param updatePostDto: UpdatePostDto
   * @returns Promise<BlogPost>
   */
  @ApiOperation({
    summary: 'update single post',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostGetSingleResponse,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @UseInterceptors(FileInterceptor('image', postFileUploadConfig))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let data = { ...updatePostDto };
    if (image) {
      data = { ...updatePostDto, image: image.filename };
    }
    return await this.postsService.update(id, data);
  }

  /**
   * archive post by id
   * @method Put
   * @param id: string
   * @returns Promise<BlogPost>
   */
  @ApiOperation({
    summary: 'update single post',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostArchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @Put(':id/archive')
  async archive(@Param('id') id: string) {
    return await this.postsService.archive(id);
  }

  /**
   * unarchive post by id
   * @method Put
   * @param id: string
   * @returns Promise<BlogPost>
   */
  @ApiOperation({
    summary: 'update single post',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostUnarchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    return await this.postsService.unarchive(id);
  }

  /**
   * bulk archive post by ids
   * @method Put
   * @param ids: string[]
   * @returns Promise<BlogPost>
   */
  @ApiOperation({
    summary: 'bulk archive post by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostArchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-archive')
  async blukArchive(@Body('ids') ids: string[]) {
    return await this.postsService.bulkArchive(ids);
  }

  /**
   * unarchive post by ids
   * @method Put
   * @param ids: string
   * @returns Promise<BlogPost>
   */
  @ApiOperation({
    summary: 'unarchive post by ids',
  })
  @ApiOkResponse({
    description: 'success',
    type: PostUnarchivedResponse,
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @ApiBody({ type: BulkActionBody })
  @Put('bulk-unarchive')
  async bulkUnarchive(@Body('ids') ids: string[]) {
    return await this.postsService.bulkUnarchive(ids);
  }

  /**
   * remove post by id
   * @method Delete
   * @param id: string
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'remove post',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({
    description: 'post not found',
    type: NotFoundResponse,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  /**
   * bulk remove post by ids
   * @method Delete
   * @param ids: string[]
   * @returns Promise<Void>
   */
  @ApiOperation({
    summary: 'bulk remove post',
  })
  @ApiNoContentResponse({
    description: 'success',
  })
  @Delete()
  @ApiBody({ type: BulkActionBody })
  @HttpCode(HttpStatus.NO_CONTENT)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.postsService.bulkRemove(ids);
  }
}
