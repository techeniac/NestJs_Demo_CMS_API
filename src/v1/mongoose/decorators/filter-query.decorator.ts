import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FilterQueryDto } from '../dto/filter-query.dto';

export const FilterQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FilterQueryDto => {
    const request = ctx.switchToHttp().getRequest();
    let filters: { [key: string]: string }[] = [];
    try {
      if (request.query.filters) {
        filters = JSON.parse(request.query.filters);
      }
      return { filters: [...filters] };
    } catch (e) {
      return { filters: [] };
    }
  },
);
