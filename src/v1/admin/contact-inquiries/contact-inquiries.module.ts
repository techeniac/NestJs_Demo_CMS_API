import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactInquiriesService } from './contact-inquiries.service';
import { ContactInquiriesController } from './contact-inquiries.controller';
import { ContactInquiry, ContactInquirySchema } from '../../mongoose/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactInquiry.name, schema: ContactInquirySchema },
    ]),
  ],
  controllers: [ContactInquiriesController],
  providers: [ContactInquiriesService],
})
export class ContactInquiriesModule {}
