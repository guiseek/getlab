import { TimeEnd, TimeStart } from '../types';
import { Team } from './team';

export interface Schedule {
  id?: string;
  team: Team;
  byweekday: number;
  timeStart: TimeStart;
  timeEnd: TimeEnd;
  interval: 1 | 2;
}
