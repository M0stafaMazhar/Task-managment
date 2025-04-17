import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Invalid email format',
    },
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
