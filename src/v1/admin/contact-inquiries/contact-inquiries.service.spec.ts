import { Test, TestingModule } from '@nestjs/testing';
import { ContactInquiriesService } from './contact-inquiries.service';

describe('ContactInquiriesService', () => {
  let service: ContactInquiriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactInquiriesService],
    }).compile();

    service = module.get<ContactInquiriesService>(ContactInquiriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
