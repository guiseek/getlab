import { TimeEnd, TimeStart } from '../types';
import { Team } from '../entities';

export interface CreateScheduleDto {
  team: Team;
  timeStart: TimeStart;
  timeEnd: TimeEnd;
  byweekday: number;
  interval: 1 | 2;
}
