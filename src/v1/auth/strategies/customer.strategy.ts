import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { CustomersService } from '../customers/customers.service';
import { AuthRoles } from '../types';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(
  Strategy,
  'AuthCustomer',
) {
  constructor(private readonly customerService: CustomersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {

    if (payload.role !== AuthRoles.Customer) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    const customer = await this.customerService.findCustomer({
      _id: payload.id,
    });

    const customerJson = customer.toJSON();
    delete customerJson.password;

    if (!customer) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    if (customer.emailVerifiedAt === null) {
      return done(
        new HttpException('email address not verified.', HttpStatus.FORBIDDEN),
        false,
      );
    }

    return done(null, customerJson, payload.iat);
  }
}
