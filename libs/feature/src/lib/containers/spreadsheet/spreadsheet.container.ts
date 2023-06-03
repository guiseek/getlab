import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay } from 'rxjs';
import { SpreadsheetForm } from '../../forms';
import {
  Schedule,
  ScheduleFacade,
  SpreadsheetFacade,
} from '@getlab/data-access';
import { isBreakpoint } from '../shared';

@Component({
  selector: 'getlab-spreadsheet',
  templateUrl: './spreadsheet.container.html',
  styleUrls: ['./spreadsheet.container.scss'],
})
export class SpreadsheetContainer implements OnInit {
  protected destroyRef = inject(DestroyRef);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  scheduleFacade = inject(ScheduleFacade);
  spreadsheetFacade = inject(SpreadsheetFacade);

  readonly spreadsheetForm = new SpreadsheetForm();

  columns$ = isBreakpoint('Handset').pipe(
    map((match) =>
      match
        ? ['date', 'time', 'ref']
        : ['date', 'time', 'ref', 'people', 'goal']
    ),
    shareReplay()
  );

  get schedules() {
    return this.spreadsheetForm.controls.schedules.value;
  }

  ngOnInit() {
    this.spreadsheetFacade.clear();
    this.scheduleFacade.load();

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ dtstart, until, scheduleIds = [] }) => {
        if (dtstart && until) {
          this.#patchFormDate(new Date(dtstart), new Date(until));
        }
        if (scheduleIds.length) {
          this.scheduleFacade.findSchedules(...scheduleIds);
        }
      });

    this.scheduleFacade.filtered$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((schedules) => {
        const { dtstart, until } = this.spreadsheetForm.value;
        if (dtstart && until) {
          this.spreadsheetFacade.build({ schedules, dtstart, until });
        }
        this.#patchFormSchedules(schedules);
      });

    this.spreadsheetFacade.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.spreadsheetFacade.parse(data);
      });

    this.spreadsheetForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ schedules, dtstart, until }) => {
        if (schedules && schedules.length && dtstart && until) {
          const scheduleIds = schedules.map(({ id }) => id);
          const queryParams = { dtstart, until, scheduleIds };
          this.router.navigate(['.'], { queryParams });
        }
      });
  }

  #patchFormDate(dtstart: Date, until: Date) {
    this.spreadsheetForm.patchValue({ dtstart, until }, { emitEvent: false });
  }

  #patchFormSchedules(schedules: Schedule[]) {
    this.spreadsheetForm.patchValue({ schedules }, { emitEvent: false });
  }

  compareFn(schedule1: Schedule, schedule2: Schedule) {
    return schedule1 && schedule2 && schedule1.id === schedule2.id;
  }
}
