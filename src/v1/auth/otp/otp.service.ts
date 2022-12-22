import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from '../../mongoose/schemas';
import { AuthRoles, OTPType } from '../types';

@Injectable()
export class OtpService {
  private readonly otpExpireInMinutes = 5;

  constructor(
    @InjectModel(Otp.name)
    private readonly otpModel: Model<OtpDocument>,
  ) {}

  private generate() {
    return Array.from(Array(6))
      .map((value) => Math.floor(Math.random() * 10))
      .join('');
  }

  private getExpireDateString() {
    return new Date(
      new Date().getTime() + this.otpExpireInMinutes * 60000,
    ).toISOString();
  }

  private isOtpExpired(otpDocument: OtpDocument) {
    const currentDate = new Date();
    const expireDate = new Date(otpDocument.expireAt);

    if (currentDate.getTime() > expireDate.getTime()) {
      throw new BadRequestException('OTP Expired');
    }

    return true;
  }

  async storeCustomerEmailVerificationOtp(email: string): Promise<string> {
    const otp = this.generate();

    await this.otpModel.create({
      email,
      otp,
      type: OTPType.EmailVerification,
      role: AuthRoles.Customer,
      expireAt: this.getExpireDateString(),
    });

    return otp;
  }

  async verifyCustomerEmailVerificationOtp(email: string, otp: string) {
    const otpDocument = await this.otpModel.findOne({
      email,
      otp,
      type: OTPType.EmailVerification,
      role: AuthRoles.Customer,
    });

    if (!otpDocument) {
      throw new BadRequestException('invalid OTP');
    }

    this.isOtpExpired(otpDocument);

    return true;
  }

  async removeCustomerEmailVerificationOtp(email: string) {
    await this.otpModel.deleteMany({
      email,
      type: OTPType.EmailVerification,
      role: AuthRoles.Customer,
    });
  }

  async storeCustomerForgotPasswordOtp(email: string): Promise<string> {
    const otp = this.generate();

    await this.otpModel.create({
      email,
      otp,
      type: OTPType.ForgotPassword,
      role: AuthRoles.Customer,
      expireAt: this.getExpireDateString(),
    });

    return otp;
  }

  async verifyCustomerForgotPasswordOtp(email: string, otp: string) {
    const otpDocument = await this.otpModel.findOne({
      email,
      otp,
      type: OTPType.ForgotPassword,
      role: AuthRoles.Customer,
    });

    if (!otpDocument) {
      throw new BadRequestException('invalid OTP');
    }

    this.isOtpExpired(otpDocument);

    return true;
  }

  async removeCustomerForgotPasswordOtp(email: string) {
    await this.otpModel.deleteMany({
      email,
      type: OTPType.ForgotPassword,
      role: AuthRoles.Customer,
    });
  }

  async storeAdminForgotPasswordOtp(email: string): Promise<string> {
    const otp = this.generate();

    await this.otpModel.create({
      email,
      otp,
      type: OTPType.ForgotPassword,
      role: AuthRoles.Admin,
      expireAt: this.getExpireDateString(),
    });

    return otp;
  }

  async removeAdminForgotPasswordOtp(email: string) {
    await this.otpModel.deleteMany({
      email,
      type: OTPType.ForgotPassword,
      role: AuthRoles.Admin,
    });
  }
}
