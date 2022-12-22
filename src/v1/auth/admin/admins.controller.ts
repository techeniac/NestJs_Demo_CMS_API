import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from '../dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { AuthenticatedUser } from '../decorators';
import { AdminDocument } from 'src/v1/mongoose/schemas';

@ApiTags('Frontend - Auth Admin')
@Controller('v1/auth/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.adminsService.login(loginDto);
  }

  @UseGuards(AuthGuard('AuthAdmin'))
  @Get()
  async account(@AuthenticatedUser() currentAdmin: AdminDocument) {
    return currentAdmin;
  }

  @UseGuards(AuthGuard('AuthAdmin'))
  @Post('change-password')
  async changePassword(
    @AuthenticatedUser() currentAdmin: AdminDocument,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.adminsService.changePassword(
      currentAdmin,
      changePasswordDto,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.adminsService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.adminsService.resetPassword(resetPasswordDto);
  }
}
