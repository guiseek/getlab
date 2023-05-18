import { Team } from './team';
import { Time } from './time';

export interface Schedule {
  id?: string;
  team: Team;
  byweekday: number;
  time: Time;
  interval: 1 | 2;
}
