import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
import { ContactInquiriesModule } from './contact-inquiries/contact-inquiries.module';
import { FaqsModule } from './faqs/faqs.module';
import { NewslettersModule } from './newsletters/newsletters.module';
import { TestimonialsModule } from './testimoanials/testimonials.module';

@Module({
  imports: [
    FaqsModule,
    TestimonialsModule,
    ContactInquiriesModule,
    NewslettersModule,
    BlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class FrontendModule {}
