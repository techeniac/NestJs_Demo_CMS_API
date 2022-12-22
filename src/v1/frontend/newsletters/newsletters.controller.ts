import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto, UnsubscribeNewsletterDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NewsletterCreatedResponse } from './swagger';
import { Newsletter } from '../../mongoose/schemas';

@ApiTags('Frontend - Newsletter')
@Controller('v1/newsletters')
export class NewslettersController {
  constructor(private readonly newslettersService: NewslettersService) {}

  /**
   * store newsletter
   * @method Post
   * @param createNewsletterDto: CreateNewsletterDto
   * @returns Promise<Newsletter>
   */
  @ApiOperation({
    summary: 'Create newsletter',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: NewsletterCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Post()
  async create(
    @Body() createNewsletterDto: CreateNewsletterDto,
  ): Promise<Newsletter> {
    return await this.newslettersService.create(createNewsletterDto);
  }

  /**
   * store newsletter
   * @method Post
   * @param id: string
   * @param unsubscribeNewsletterDto: CreateNewsletterDto
   * @returns Promise<Newsletter>
   */
  @ApiOperation({
    summary: 'unsubscribe newsletter by id',
  })
  @ApiOkResponse({
    description: 'The record has been successfully unsubscribed.',
    type: NewsletterCreatedResponse,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Patch(':id')
  async unsubscribe(
    @Param('id') id: string,
    @Body() unsubscribeNewsletterDto: UnsubscribeNewsletterDto,
  ): Promise<Newsletter> {
    return await this.newslettersService.unsubscribe(
      id,
      unsubscribeNewsletterDto,
    );
  }
}
