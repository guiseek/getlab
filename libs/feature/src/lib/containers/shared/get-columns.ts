import { map, shareReplay } from 'rxjs';
import { isBreakpoint } from './is-breakpoint';

export function getColumns(
  allColumns: string[],
  handsetColumns = allColumns.slice(0, 3)
) {
  return isBreakpoint('Handset').pipe(
    map((match) => (match ? handsetColumns : allColumns)),
    shareReplay()
  );
}
