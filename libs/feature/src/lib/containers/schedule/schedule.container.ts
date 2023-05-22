import {
  Schedule,
  TeamFacade,
  ScheduleFacade,
  CreateScheduleDto,
  UpdateScheduleDto,
} from '@getlab/data-access';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, takeUntil } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../../components';
import { ScheduleForm } from '../../forms';
import { EntityContainer } from '../base';

@Component({
  selector: 'getlab-schedule',
  templateUrl: './schedule.container.html',
  styleUrls: ['./schedule.container.scss'],
})
export class ScheduleContainer
  extends EntityContainer<Schedule, CreateScheduleDto, UpdateScheduleDto>
  implements OnInit
{
  form = new ScheduleForm();

  bpObserver = inject(BreakpointObserver);
  scheduleFacade = inject(ScheduleFacade);
  teamFacade = inject(TeamFacade);
  route = inject(ActivatedRoute);

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['time', 'team', 'update', 'remove']
        : ['time', 'byweekday', 'team', 'update', 'remove'];
    }),
    shareReplay()
  );

  ngOnInit() {
    this.form.onInit();
    this.scheduleFacade.load();
    this.teamFacade.load();

    this.scheduleFacade.schedule$
      .pipe(takeUntil(this.subject))
      .subscribe((schedule) => {
        if (schedule) {
          this.form.patchValue(schedule);
          this.formEl.scrollIntoView({
            behavior: 'smooth',
          });
        }
      });

    this.route.params.pipe(takeUntil(this.subject)).subscribe(({ id }) => {
      if (id) this.scheduleFacade.findSchedule(id);
    });
  }

  @ConfirmDialog<Schedule>({
    title: 'Remover horário',
    message: 'Tem certeza de que deseja continuar esta ação?',
    prop: 'timeStart',
  })
  onRemove({ id }: Schedule) {
    if (id) this.scheduleFacade.removeSchedule(id);
  }

  create(value: CreateScheduleDto) {
    this.scheduleFacade.createSchedule(value);
  }

  update(value: UpdateScheduleDto) {
    this.scheduleFacade.updateSchedule(value);
  }
}
