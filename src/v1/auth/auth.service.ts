import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from './types';

@Injectable()
export class AuthService {
  signPayload(payload: Payload): string {
    return sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_SECRET_KEY_EXPIRES_IN,
    });
  }

}
