import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Schedule,
  ScheduleFacade,
  SpreadsheetFacade,
} from '@getlab/data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, shareReplay, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SpreadsheetForm } from '../../forms';

@Component({
  selector: 'getlab-spreadsheet',
  templateUrl: './spreadsheet.container.html',
  styleUrls: ['./spreadsheet.container.scss'],
})
export class SpreadsheetContainer implements OnInit, OnDestroy {
  #subject = new Subject<void>();

  spreadsheetForm = new SpreadsheetForm();

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['date', 'time', 'ref']
        : ['date', 'time', 'ref', 'people', 'goal'];
    }),
    shareReplay()
  );

  get schedules() {
    return this.spreadsheetForm.controls.schedules.value;
  }

  constructor(
    private bpObserver: BreakpointObserver,
    readonly scheduleFacade: ScheduleFacade,
    readonly spreadsheetFacade: SpreadsheetFacade,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.scheduleFacade.load();
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.#subject))
      .subscribe(({ dtstart, until, scheduleIds = [] }) => {
        if (dtstart && until) {
          this.#patchFormDate(new Date(dtstart), new Date(until));
        }
        if (scheduleIds.length) {
          this.scheduleFacade.findSchedules(...scheduleIds);
        }
      });

    this.scheduleFacade.filtered$
      .pipe(takeUntil(this.#subject))
      .subscribe((schedules) => {
        const { dtstart, until } = this.spreadsheetForm.value;
        if (dtstart && until) {
          this.spreadsheetFacade.build({ schedules, dtstart, until });
        }
        this.#patchFormSchedules(schedules);
      });

    this.spreadsheetFacade.data$
      .pipe(takeUntil(this.#subject))
      .subscribe((data) => {
        this.spreadsheetFacade.parse(data);
      });

    this.spreadsheetForm.valueChanges.subscribe(
      ({ schedules, dtstart, until }) => {
        if (schedules && schedules.length && dtstart && until) {
          const scheduleIds = schedules.map(({ id }) => id);
          const queryParams = { dtstart, until, scheduleIds };
          this.router.navigate(['.'], { queryParams });
        }
      }
    );
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

  ngOnDestroy() {
    this.#subject.next();
    this.#subject.complete();
  }
}
