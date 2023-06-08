import { Frequency, Options, RRule } from 'rrule';
import { Schedule } from './schedule';

export class DateRule {
  constructor(public schedule: Schedule) {}

  getInterval(start: Date, end: Date) {
    const { interval, byweekday } = this.schedule;

    const dtstart = new Date(start);
    const until = new Date(end);

    return { interval, byweekday, dtstart, until };
  }

  getDates(options: Partial<Options>) {
    return new RRule({ ...options, freq: Frequency.WEEKLY }).all();
  }
}
