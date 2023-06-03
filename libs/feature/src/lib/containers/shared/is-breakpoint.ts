import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const isBreakpoint = <K extends keyof typeof Breakpoints>(media: K) => {
  const bpObserver = inject(BreakpointObserver);
  return bpObserver
    .observe(Breakpoints[media])
    .pipe(map((result) => result.matches));
};
