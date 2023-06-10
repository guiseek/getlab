import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  id: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  ref: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
