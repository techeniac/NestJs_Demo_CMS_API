import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationQueryDto } from '../dto';

export const PaginationQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryDto => {
    const request = ctx.switchToHttp().getRequest();
    const query: any = {};
    if (request.query.sort) {
      query.sort =
        request.query.sort.length > 0 ? request.query.sort : '-createdAt';
    }

    if (request.query.page) {
      query.page =
        request.query.page.length > 0 ? parseInt(request.query.page) : 1;
    }

    if (request.query.limit) {
      query.limit =
        request.query.limit.length > 0 ? parseInt(request.query.limit) : 10;
    }
    return { ...query };
  },
);
