import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  TeamFacade,
  ScheduleFacade,
  CreateScheduleDto,
  UpdateScheduleDto,
} from '@getlab/data-access';
import { MatButton } from '@angular/material/button';
import { Component, ViewChild } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { ScheduleForm } from '../../forms';

@Component({
  selector: 'getlab-schedule',
  templateUrl: './schedule.container.html',
  styleUrls: ['./schedule.container.scss'],
})
export class ScheduleContainer {
  @ViewChild('resetRef', { static: true })
  resetButton!: MatButton;
  get resetRef() {
    return this.resetButton._elementRef;
  }

  scheduleForm = new ScheduleForm();

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['team', 'time', 'update', 'remove']
        : ['team', 'time', 'byweekday', 'update', 'remove'];
    }),
    shareReplay()
  );

  constructor(
    private bpObserver: BreakpointObserver,
    readonly scheduleFacade: ScheduleFacade,
    readonly teamFacade: TeamFacade
  ) {
    this.scheduleForm.onInit();
    this.scheduleFacade.load();
    this.teamFacade.load();
    this.teamFacade.hasNoTeams$.subscribe((hasNoTeams) => {
      if (hasNoTeams) {
        this.scheduleForm.disable();
      } else {
        this.scheduleForm.enable();
      }
    });
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      if (this.scheduleForm.hasId) {
        this.#update(this.scheduleForm.getValue());
      } else {
        this.#create(this.scheduleForm.getValue());
      }
      this.resetRef.nativeElement.click();
    } else {
      this.scheduleForm.markAllAsTouched();
    }
  }

  #create(value: CreateScheduleDto) {
    this.scheduleFacade.createSchedule(value);
  }

  #update(value: UpdateScheduleDto) {
    this.scheduleFacade.updateSchedule(value);
  }
}
