import { Controller } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  ForbiddenResponse,
  UnauthorizedResponse,
} from '../swagger/types';

@ApiUnauthorizedResponse({
  description: 'Unauthorized access',
  type: UnauthorizedResponse,
})
@ApiForbiddenResponse({
  description: 'forbidden access - only admin can access',
  type: ForbiddenResponse,
})
@Controller()
export class AdminController {}
