import { Test, TestingModule } from '@nestjs/testing';
import { ContactInquiriesController } from './contact-inquiries.controller';
import { ContactInquiriesService } from './contact-inquiries.service';

describe('ContactInquiriesController', () => {
  let controller: ContactInquiriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactInquiriesController],
      providers: [ContactInquiriesService],
    }).compile();

    controller = module.get<ContactInquiriesController>(ContactInquiriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
