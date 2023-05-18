export interface SpreadsheetRow {
  id: string;
  name: string;
  ref: string;
  people: number;
  goal: string;
  date: Date;
  byweekday: number;
  interval: 1 | 2;
  time: string;
}
