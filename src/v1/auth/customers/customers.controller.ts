import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterCustomerDto } from './dto';
import { AuthGuard } from '@nestjs/passport/dist';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from '../dto';
import { AuthenticatedUser } from '../decorators';
import { CustomerDocument } from 'src/v1/mongoose/schemas';
import { OtpDto } from '../otp/dto/otp.dto';

@ApiTags('Frontend - Auth Customer')
@Controller('v1/auth/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterCustomerDto) {
    return await this.customersService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.customersService.login(loginDto);
  }

  @UseGuards(AuthGuard('AuthCustomer'))
  @Get()
  async account(@AuthenticatedUser() currentCustomer: CustomerDocument) {
    return currentCustomer;
  }

  @UseGuards(AuthGuard('AuthCustomer'))
  @Post('resend-email-verification-otp')
  async resendEmailVerificationOtp(
    @AuthenticatedUser() currentCustomer: CustomerDocument,
  ) {
    if (currentCustomer.emailVerifiedAt !== null) {
      throw new BadRequestException('email address already verified');
    }

    return await this.customersService.resendEmailVerificationOtp(
      currentCustomer,
    );
  }

  @UseGuards(AuthGuard('AuthCustomer'))
  @Post('verify-email-verification-otp')
  async verifyEmailVerificationOtp(
    @AuthenticatedUser() currentCustomer: CustomerDocument,
    @Body() otpDto: OtpDto,
  ) {
    if (currentCustomer.emailVerifiedAt !== null) {
      throw new BadRequestException('email address already verified');
    }

    return await this.customersService.verifyEmailVerificationOtp(
      currentCustomer,
      otpDto.otp,
    );
  }

  @UseGuards(AuthGuard('AuthCustomer'))
  @Post('change-password')
  async changePassword(
    @AuthenticatedUser() currentCustomer: CustomerDocument,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.customersService.changePassword(
      currentCustomer,
      changePasswordDto,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.customersService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.customersService.resetPassword(resetPasswordDto);
  }
}
