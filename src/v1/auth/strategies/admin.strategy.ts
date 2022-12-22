import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { AdminsService } from '../admin/admins.service';
import { AuthRoles } from '../types';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'AuthAdmin') {
  constructor(private readonly adminsService: AdminsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    console.log('payload', payload);

    if (payload.role !== AuthRoles.Admin) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    const admin = await this.adminsService.findAdmin({
      _id: payload.id,
    });

    const adminJson = admin.toJSON();
    delete adminJson.password;

    if (!admin) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, adminJson, payload.iat);
  }
}
