import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from 'src/v1/mongoose/schemas';
import { OtpService } from './otp.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
  controllers: [],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
