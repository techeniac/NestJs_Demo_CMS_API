import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreatedResponse {
  @ApiProperty({ type: 'string', default: '637b28ff153a4814cd9b492b' })
  id: string;

  @ApiProperty({ type: 'string', default: 'tag title' })
  title: string;

  @ApiProperty({ type: 'string', default: 'tag-title' })
  slug: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  createdAt: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  updatedAt: string;
}
