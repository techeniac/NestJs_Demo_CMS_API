import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, default: '', slug: 'title', unique: true })
  slug: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
