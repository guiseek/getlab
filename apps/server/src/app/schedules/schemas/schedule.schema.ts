import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Team } from '../../teams/schemas/team.schema';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({
  id: true,
})
export class Schedule {
  @Prop({ type: Types.ObjectId, ref: 'Team' })
  team: Team;

  @Prop()
  byweekday: number;

  @Prop()
  timeStart: string;

  @Prop()
  timeEnd: string;

  @Prop()
  interval: number;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
