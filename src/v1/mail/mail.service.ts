import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailVerificationOTP(to: string, name: string, otp: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'OTP: Email Verification',
      template: './email-verification',
      context: {
        name,
        otp,
      },
    });
  }

  async sendEmailVerified(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Email Verified',
      template: './email-verified',
      context: {
        name,
      },
    });
  }

  async sendForgotPasswordOTP(to: string, name: string, otp: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'OTP: Forgot Password',
      template: './forgot-password',
      context: {
        name,
        otp,
      },
    });
  }

  async sendResetSuccessfully(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Password reset successfully',
      template: './reset-password-successfully',
      context: {
        name,
      },
    });
  }
}
