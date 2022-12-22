import { ApiProperty } from '@nestjs/swagger';
import { Category, PostStatus, Tag } from '../../../../mongoose/schemas';

export class PostCreatedResponse {
  @ApiProperty({ type: 'string', default: '637b28ff153a4814cd9b492b' })
  id: string;

  @ApiProperty({ type: 'string', default: 'faq title' })
  title: string;

  @ApiProperty({ type: 'string', default: 'faq-description' })
  slug: string;

  @ApiProperty({ type: 'string', default: '' })
  excerpt: string;

  @ApiProperty({ type: 'string', default: '' })
  content: string;

  @ApiProperty({ type: 'string', default: '' })
  image: string;

  @ApiProperty({ type: 'string', default: 'https://domain.com/path/image.jpg' })
  imageUrl: string;

  @ApiProperty({ type: Array<Tag>, default: [] })
  tags: Tag[];

  @ApiProperty({ type: Array<Category>, default: [] })
  categories: Category[];

  @ApiProperty({ type: 'string', default: '' })
  metaTitle: string;

  @ApiProperty({ type: 'string', default: '' })
  metaDescription: string;

  @ApiProperty({ type: 'string', default: '' })
  metaKeywords: string;

  @ApiProperty({ type: 'string', default: '' })
  headerContent: string;

  @ApiProperty({ enum: PostStatus, default: 1 })
  status: PostStatus;

  @ApiProperty({ type: 'string | null', default: null })
  archivedAt: string | null;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  createdAt: string;

  @ApiProperty({ type: 'string', default: '2022-11-21T09:23:23.169Z' })
  updatedAt: string;
}
