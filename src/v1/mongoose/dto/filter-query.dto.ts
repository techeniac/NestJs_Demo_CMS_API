import { IsOptional, IsString } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  filters: { [key: string]: string }[];
}
