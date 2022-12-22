import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthRoles, OTPType } from '../../auth/types';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  otp: string;

  @Prop({ required: true })
  type: OTPType;

  @Prop({ required: true })
  role: AuthRoles;

  @Prop({ type: String, required: true })
  expireAt: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
