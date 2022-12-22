import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { testimonialConfig } from '../../config';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema({
  timestamps: true,
  virtuals: true,
  toJSON: {
    // getters: true,
    transform: true,
  },
})
export class Testimonial {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, default: '' })
  designation: string;

  @Prop({ type: String, default: '' })
  image: string;

  imageUrl: string;

  @Prop({ type: String, default: '' })
  review: string;

  @Prop({ required: true })
  status: TestimonialStatus;

  @Prop({ default: null })
  archivedAt: string | null;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);

export enum TestimonialStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

// add virtual property imageUrl
TestimonialSchema.virtual('imageUrl').get(function () {
  return this.image && this.image.length
    ? `${process.env.APP_URL}${testimonialConfig.image.path}/${this.image
        .split('\\')
        .join('/')}`
    : '';
});
