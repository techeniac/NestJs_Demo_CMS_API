import { Controller, Post, Body, Ip } from '@nestjs/common';
import { ContactInquiriesService } from './contact-inquiries.service';
import { CreateContactInquiryDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ContactInquiryCreatedResponse } from './swagger';
import { ContactInquiry } from '../../mongoose/schemas';

@ApiTags('Frontend - ContactInquiry')
@Controller('v1/contact-inquiries')
export class ContactInquiriesController {
  constructor(
    private readonly contactInquiriesService: ContactInquiriesService,
  ) {}

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
  async create(
    @Body() createContactInquiryDto: CreateContactInquiryDto,
    @Ip() ip: string,
  ): Promise<ContactInquiry> {
    return await this.contactInquiriesService.create(
      createContactInquiryDto,
      ip,
    );
  }
}
