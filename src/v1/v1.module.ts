import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as mongooseSlugGenerator from 'mongoose-slug-generator';
import { transformJsonPlugin } from './mongoose/plugins';
import { AdminModule } from './admin/admin.module';
import { FrontendModule } from './frontend/frontend.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      connectionFactory: (connection) => {
        connection.plugin(mongoosePaginate);
        connection.plugin(mongooseSlugGenerator);
        connection.plugin(transformJsonPlugin);
        return connection;
      },
    }),
    AdminModule,
    FrontendModule,
    AuthModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class V1Module {}
