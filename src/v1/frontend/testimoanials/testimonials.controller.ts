import { Controller, Get } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestimonialGetAllResponse } from './swagger';

@ApiTags("Frontend - Testimonial")
@Controller('v1/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  /**
   * get all testimonials
   * @method Get
   * @returns
   */
  @ApiOperation({
    summary: 'get all testimonials',
  })
  @ApiOkResponse({
    description: 'success',
    type: TestimonialGetAllResponse,
  })
  @Get()
  async findAll() {
    return { data: await this.testimonialsService.findAll() };
  }
}
