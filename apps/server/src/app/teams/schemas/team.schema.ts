import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema({
  id: true,
})
export class Team {
  @Prop()
  name: string;

  @Prop()
  ref: string;

  @Prop()
  people: number;

  @Prop()
  goal: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
