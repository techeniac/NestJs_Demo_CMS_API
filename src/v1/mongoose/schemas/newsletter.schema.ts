import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsletterDocument = HydratedDocument<Newsletter>;

@Schema({ timestamps: true })
export class Newsletter {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, default: '' })
  reason: string;

  @Prop({ default: null })
  unsubscribedAt: string | null;

  @Prop({ default: null })
  archivedAt: string | null;
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);
