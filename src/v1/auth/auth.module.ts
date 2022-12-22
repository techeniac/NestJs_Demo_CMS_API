import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminsModule } from './admin/admins.module';
import { AdminJwtStrategy } from './strategies/admin.strategy';
import { CustomersModule } from './customers/customers.module';
import { CustomerJwtStrategy } from './strategies';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [CustomersModule, AdminsModule, OtpModule],
  controllers: [],
  providers: [
    AuthService,
    CustomerJwtStrategy,
    AdminJwtStrategy
  ],
})
export class AuthModule {}
