import { BuildSpreadsheetDto } from '../../dtos';
import { Frequency, RRule, Options } from 'rrule';
import { SpreadsheetRow } from '../../entities';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class BuildSpreadsheetUseCase
  implements UseCase<BuildSpreadsheetDto, SpreadsheetRow[]>
{
  execute({ schedules, dtstart, until }: BuildSpreadsheetDto) {
    const spreadsheet = schedules
      .map((schedule) => {
        const options = this.#getRRules(schedule, dtstart, until);
        const dates = this.#getDates(options);
        return dates.map((date) => ({ ...schedule, date }));
      })
      .reduce((prev, curr) => [...prev, ...curr], [])
      .map(({ team, timeStart, timeEnd, ...schedule }) => {
        return {
          time: `${timeStart} as ${timeEnd}`,
          ...schedule,
          ...team,
        };
      })
      .sort((a, b) => (a.date < b.date ? -1 : 1));

    return Promise.resolve(spreadsheet);
  }

  #getRRules({ byweekday, interval }: Schedule, dtstart: Date, until: Date) {
    return {
      interval,
      byweekday,
      dtstart: new Date(dtstart),
      until: new Date(until),
    };
  }

  #getDates(options: Partial<Options>) {
    return new RRule({ ...options, freq: Frequency.WEEKLY }).all();
  }
}
