import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import { Admin, AdminDocument } from '../../mongoose/schemas';
import { ChangePasswordDto, ForgotPasswordDto, LoginDto, ResetPasswordDto } from '../dto';
import { AuthService } from '../auth.service';
import { AuthRoles } from '../types';
import { MailService } from 'src/v1/mail/mail.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AdminsService extends AuthService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {
    super();
  }

  /**
   * login admin
   */
  async login(loginDto: LoginDto) {
    const admin = await this.findAdmin({
      email: loginDto.email,
    });

    if (!admin || !compareSync(loginDto.password, admin.password)) {
      throw new BadRequestException(
        'admin email or password does not match',
      );
    }

    return this.signAdminPayload(admin);
  }

  private signAdminPayload(adminDocument: AdminDocument) {
    const adminJson = adminDocument.toJSON();

    delete adminJson.password;

    return {
      ...adminJson,
      token: this.signPayload({
        id: adminDocument.id,
        role: AuthRoles.Admin,
      }),
    };
  }

  async findAdmin(filter: { _id: string } | { email: string }) {
    return await this.adminModel.findOne(filter);
  }

  async changePassword(
    adminDocument: AdminDocument,
    changePasswordDto: ChangePasswordDto,
  ) {
    const admin = (
      await this.adminModel.findById(adminDocument.id)
    ).toObject();
    if (!compareSync(changePasswordDto.currentPassword, admin.password)) {
      throw new BadRequestException('current password does not match');
    }
    await this.adminModel.updateOne(
      { _id: adminDocument.id },
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
    const admin = await this.adminModel.findOne({
      email: forgotPasswordDto.email,
    });

    if (!admin) {
      throw new BadRequestException('email address does not exists');
    }

    const otp = await this.otpService.storeAdminForgotPasswordOtp(
      admin.email,
    );

    await this.mailService.sendForgotPasswordOTP(
      admin.email,
      `${admin.firstName} ${admin.lastName}`,
      otp,
    );

    return { message: 'OTP sent successfully.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const admin = await this.adminModel.findOne({
      email: resetPasswordDto.email,
    });

    if (!admin) {
      throw new BadRequestException('email address does not exists');
    }

    await this.otpService.removeAdminForgotPasswordOtp(admin.email);
    await this.adminModel.updateOne(
      { _id: admin.id },
      {
        password: hashSync(
          resetPasswordDto.newPassword,
          process.env.PASSWORD_HASH_SALT,
        ),
      },
    );

    await this.mailService.sendResetSuccessfully(
      admin.email,
      `${admin.firstName} ${admin.lastName}`,
    );
    return { message: 'reset password successfully.' };
  }
}
