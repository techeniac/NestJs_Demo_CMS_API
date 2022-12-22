import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { postConfig } from '../../config';
import { Category } from './category.schema';
import { Tag } from './tag.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, unique: true, slug: 'title' })
  slug: string;

  @Prop({ type: String, required: false, default: '' })
  excerpt: string;

  @Prop({ type: String, required: false, default: '', raw: true })
  content: string;

  @Prop({ type: String, required: false, default: '' })
  image: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }] })
  tags: Tag[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Category.name }] })
  categories: Category[];

  @Prop({ type: String, required: false, default: '' })
  metaTitle: string;

  @Prop({ type: String, required: false, default: '' })
  metaDescription: string;

  @Prop({ type: String, required: false, default: '' })
  metaKeywords: string;

  @Prop({ type: String, required: false, default: '', raw: true })
  headerContent: string;

  @Prop({ required: true })
  status: PostStatus;

  @Prop({ default: null })
  archivedAt: string | null;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export enum PostStatus {
  UNPUBLISHED = 0,
  PUBLISHED = 1,
}

// add virtual property imageUrl
PostSchema.virtual('imageUrl').get(function () {
  return this.image && this.image.length
    ? `${process.env.APP_URL}${postConfig.image.path}/${this.image
        .split('\\')
        .join('/')}`
    : '';
});
