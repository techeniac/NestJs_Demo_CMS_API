import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import { Customer, CustomerDocument } from '../../mongoose/schemas';
import { RegisterCustomerDto } from './dto';
import { AuthService } from '../../auth/auth.service';
import { AuthRoles } from '../../auth/types';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from '../dto';
import { MailService } from '../../mail/mail.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class CustomersService extends AuthService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {
    super();
  }

  private async sendEmailVerificationOTP(customer: CustomerDocument) {
    await this.otpService.removeCustomerEmailVerificationOtp(customer.email);

    const otp = await this.otpService.storeCustomerEmailVerificationOtp(
      customer.email,
    );

    await this.mailService.sendEmailVerificationOTP(
      customer.email,
      `${customer.firstName} ${customer.lastName}`,
      otp,
    );
  }

  /**
   * register customer
   */
  async register(registerDto: RegisterCustomerDto) {
    const isCustomerExits = await this.findCustomer({
      email: registerDto.email,
    });

    if (isCustomerExits) {
      throw new BadRequestException('customer already exists');
    }

    const customer = await this.customerModel.create({ ...registerDto });

    await this.sendEmailVerificationOTP(customer);

    return this.signCustomerPayload(customer);
  }

  /**
   * login customer
   */
  async login(loginDto: LoginDto) {
    const customer = await this.findCustomer({
      email: loginDto.email,
    });

    if (!customer || !compareSync(loginDto.password, customer.password)) {
      throw new BadRequestException(
        'customer email or password does not match',
      );
    }

    return this.signCustomerPayload(customer);
  }

  private signCustomerPayload(customerDocument: CustomerDocument) {
    const customerJson = customerDocument.toJSON();

    delete customerJson.password;

    return {
      ...customerJson,
      token: this.signPayload({
        id: customerDocument.id,
        role: AuthRoles.Customer,
      }),
    };
  }

  async findCustomer(filter: { _id: string } | { email: string }) {
    return await this.customerModel.findOne(filter);
  }

  async resendEmailVerificationOtp(customer: CustomerDocument) {
    await this.sendEmailVerificationOTP(customer);
    return { message: 'otp sent successfully.' };
  }

  async verifyEmailVerificationOtp(customer: CustomerDocument, otp: string) {
    await this.otpService.verifyCustomerEmailVerificationOtp(
      customer.email,
      otp,
    );
    await this.otpService.removeCustomerEmailVerificationOtp(customer.email);
    await this.customerModel.updateOne(
      { _id: customer.id },
      { emailVerifiedAt: new Date().toISOString() },
    );
    await this.mailService.sendEmailVerified(
      customer.email,
      `${customer.firstName} ${customer.lastName}`,
    );
    return { message: 'email verified successfully.' };
  }

  async changePassword(
    customerDocument: CustomerDocument,
    changePasswordDto: ChangePasswordDto,
  ) {
    const customer = (
      await this.customerModel.findById(customerDocument.id)
    ).toObject();
    if (!compareSync(changePasswordDto.currentPassword, customer.password)) {
      throw new BadRequestException('current password does not match');
    }
    await this.customerModel.updateOne(
      { _id: customerDocument.id },
      {
        password: hashSync(
          changePasswordDto.newPassword,
          process.env.PASSWORD_HASH_SALT,
        ),
      },
    );
    return { message: 'password changed successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const customer = await this.customerModel.findOne({
      email: forgotPasswordDto.email,
    });

    if (!customer) {
      throw new BadRequestException('email address does not exists');
    }

    const otp = await this.otpService.storeCustomerForgotPasswordOtp(
      customer.email,
    );

    await this.mailService.sendForgotPasswordOTP(
      customer.email,
      `${customer.firstName} ${customer.lastName}`,
      otp,
    );

    return { message: 'OTP sent successfully.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const customer = await this.customerModel.findOne({
      email: resetPasswordDto.email,
    });

    if (!customer) {
      throw new BadRequestException('email address does not exists');
    }

    await this.otpService.removeCustomerForgotPasswordOtp(customer.email);
    await this.customerModel.updateOne(
      { _id: customer.id },
      {
        password: hashSync(
          resetPasswordDto.newPassword,
          process.env.PASSWORD_HASH_SALT,
        ),
      },
    );

    await this.mailService.sendResetSuccessfully(
      customer.email,
      `${customer.firstName} ${customer.lastName}`,
    );
    return { message: 'reset password successfully.' };
  }
}
