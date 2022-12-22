import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { customerConfig } from 'src/v1/config';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: String, default: '' })
  age: string;

  @Prop({ type: String, default: '' })
  gender: string;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ default: null })
  emailVerifiedAt: string | null;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// hash password before save
CustomerSchema.pre('save', function (next) {
  console.log("save", this)
  this.password = hashSync(this.password, process.env.PASSWORD_HASH_SALT);
  next();
});

// remove password field
CustomerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
    delete ret.password;
  },
});

// add virtual property avatarUrl
CustomerSchema.virtual('avatarUrl').get(function () {
  return this.avatar && this.avatar.length
    ? `${process.env.APP_URL}${customerConfig.avatar.path}/${this.avatar
        .split('\\')
        .join('/')}`
    : '';
});
