import { months } from './months';
import { Row } from './types/row';

export const formatRow = (row: Row) => {
  const date = `${row.date.getDate()}/${months[row.date.getMonth()]}.		`;
  return date + `${row.time}		` + `${row.ref}		` + `${row.people}	` + row.goal;
};
