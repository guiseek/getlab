import { Schedule, ScheduleRepository, Time } from '@getlab/domain';
import { refactorTeam } from './refactor-team';

export const refactorSchedule = <T extends Schedule>(
  schedule: T & { time?: Partial<Time> }
): Schedule => {
  return 'time' in schedule
    ? ({
        id: schedule.id,
        byweekday: schedule.byweekday,
        interval: schedule.interval,
        team: refactorTeam(schedule.team),
        timeStart: schedule.time?.start ?? schedule.timeStart,
        timeEnd: schedule.time?.end ?? schedule.timeEnd,
      } satisfies Schedule)
    : schedule;
};
