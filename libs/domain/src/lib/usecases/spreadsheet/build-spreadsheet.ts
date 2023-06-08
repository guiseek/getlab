import { DateRule, SpreadsheetRow } from '../../entities';
import { BuildSpreadsheetDto } from '../../dtos';
import { UseCase } from '../../base/use-case';

export class BuildSpreadsheetUseCase
  implements UseCase<BuildSpreadsheetDto, SpreadsheetRow[]>
{
  execute({ schedules, dtstart, until }: BuildSpreadsheetDto) {
    const spreadsheet = schedules
      .map((schedule) => {
        const dateRule = new DateRule(schedule);
        const interval = dateRule.getInterval(dtstart, until);
        const dates = dateRule.getDates(interval);
        return dates.map((date) => ({ ...schedule, date }));
      })
      .reduce((prev, curr) => [...prev, ...curr], [])
      .map(({ team, timeStart, timeEnd, ...schedule }) => {
        const time = `${timeStart} as ${timeEnd}`;
        return { time, ...schedule, ...team };
      })
      .sort((a, b) => (a.date < b.date ? -1 : 1));

    return Promise.resolve(spreadsheet);
  }
}
