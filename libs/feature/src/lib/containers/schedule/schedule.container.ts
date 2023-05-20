import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Team,
  TeamFacade,
  ScheduleFacade,
  CreateScheduleDto,
  UpdateScheduleDto,
} from '@getlab/data-access';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, map, shareReplay, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ScheduleForm } from '../../forms';

@Component({
  selector: 'getlab-schedule',
  templateUrl: './schedule.container.html',
  styleUrls: ['./schedule.container.scss'],
})
export class ScheduleContainer implements OnInit, OnDestroy {
  #subject = new Subject<void>();

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
        ? ['time', 'team', 'update', 'remove']
        : ['time', 'byweekday', 'team', 'update', 'remove'];
    }),
    shareReplay()
  );

  constructor(
    private bpObserver: BreakpointObserver,
    readonly scheduleFacade: ScheduleFacade,
    readonly teamFacade: TeamFacade,
    readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.scheduleForm.onInit();
    this.scheduleFacade.load();
    this.teamFacade.load();

    this.teamFacade.hasNoTeams$
      .pipe(takeUntil(this.#subject))
      .subscribe((hasNoTeams) => {
        if (hasNoTeams) {
          this.scheduleForm.disable();
        } else {
          this.scheduleForm.enable();
        }
      });

    this.scheduleFacade.schedule$
      .pipe(takeUntil(this.#subject))
      .subscribe((schedule) => {
        if (schedule) this.scheduleForm.patchValue(schedule);
      });

    this.route.params.pipe(takeUntil(this.#subject)).subscribe(({ id }) => {
      if (id) this.scheduleFacade.findSchedule(id);
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

  compareFn(team1: Team, team2: Team) {
    return team1 && team2 && team1.id === team2.id;
  }

  #create(value: CreateScheduleDto) {
    this.scheduleFacade.createSchedule(value);
  }

  #update(value: UpdateScheduleDto) {
    this.scheduleFacade.updateSchedule(value);
  }

  ngOnDestroy() {
    this.#subject.next();
    this.#subject.complete();
  }
}
