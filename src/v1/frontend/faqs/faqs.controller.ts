import { Controller, Get } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FaqGetAllResponse } from './swagger';

@ApiTags("Frontend - Faq")
@Controller('v1/faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  /**
   * get all faqs
   * @method Get
   * @returns
   */
  @ApiOperation({
    summary: 'get all faqs',
  })
  @ApiOkResponse({
    description: 'success',
    type: FaqGetAllResponse,
  })
  @Get()
  async findAll() {
    return { data: await this.faqsService.findAll() };
  }
}
