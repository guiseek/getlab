import { DateRangeDto } from './date-range.dto';
import { Schedule } from '../entities';

export interface BuildSpreadsheetDto extends DateRangeDto {
  schedules: Schedule[];
}
