import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactInquiryDocument = HydratedDocument<ContactInquiry>;

@Schema({ timestamps: true })
export class ContactInquiry {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: false, default: '' })
  subject: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: String, required: true })
  ip: string;

  @Prop({ default: null })
  completedAt: string | null;

  @Prop({ default: null })
  archivedAt: string | null;
}

export const ContactInquirySchema =
  SchemaFactory.createForClass(ContactInquiry);
