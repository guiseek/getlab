import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScheduleFacade, SpreadsheetFacade } from '@getlab/data-access';
import { Component, OnInit } from '@angular/core';
import { SpreadsheetForm } from '../../forms';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'getlab-spreadsheet',
  templateUrl: './spreadsheet.container.html',
  styleUrls: ['./spreadsheet.container.scss'],
})
export class SpreadsheetContainer implements OnInit {
  spreadsheetForm = new SpreadsheetForm();

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['date', 'time', 'ref', 'people']
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
    readonly spreadsheetFacade: SpreadsheetFacade
  ) {
    this.scheduleFacade.load();
  }

  ngOnInit() {
    this.spreadsheetFacade.data$.subscribe((data) => {
      this.spreadsheetFacade.parse(data);
    });

    this.spreadsheetForm.valueChanges.subscribe(
      ({ schedules, dtstart, until }) => {
        if (schedules && dtstart && until) {
          this.spreadsheetFacade.build({ schedules, dtstart, until });
        }
      }
    );
  }
}
