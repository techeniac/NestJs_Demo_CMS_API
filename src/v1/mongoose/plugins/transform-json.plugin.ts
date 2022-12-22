import { Schema, QueryOptions } from 'mongoose';

export const transformJsonPlugin = (schema: Schema, options: QueryOptions) => {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
      delete ret._id;
    },
  });
};
