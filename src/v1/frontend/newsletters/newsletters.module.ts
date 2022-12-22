import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewslettersService } from './newsletters.service';
import { NewslettersController } from './newsletters.controller';
import { Newsletter, NewsletterSchema } from '../../mongoose/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Newsletter.name, schema: NewsletterSchema },
    ]),
  ],
  controllers: [NewslettersController],
  providers: [NewslettersService],
  exports: [NewslettersService],
})
export class NewslettersModule {}
