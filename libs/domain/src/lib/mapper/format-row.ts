import { SpreadsheetRow } from '../entities';

export const months = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

export const formatRow = (row: SpreadsheetRow) => {
  const date = `${row.date.getDate()}/${months[row.date.getMonth()]}.		`;
  return date + `${row.time}		` + `${row.ref}		` + `${row.people}	` + row.goal;
};
