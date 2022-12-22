import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FaqDocument = HydratedDocument<Faq>;

@Schema({ timestamps: true })
export class Faq {
  
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, default: '', raw: true })
  description: string;

  @Prop({ required: true })
  status: FaqStatus;

  @Prop({ default: null })
  archivedAt: string | null;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);

export enum FaqStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}
