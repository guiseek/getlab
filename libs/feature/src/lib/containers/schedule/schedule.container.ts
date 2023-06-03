import {
  Schedule,
  TeamFacade,
  ScheduleFacade,
  CreateScheduleDto,
  UpdateScheduleDto,
} from '@getlab/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay } from 'rxjs';
import { ConfirmDialog } from '../../components';
import { ScheduleForm } from '../../forms';
import { EntityContainer } from '../base';
import { isBreakpoint } from '../shared';

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

  override label = 'Horário';

  scheduleFacade = inject(ScheduleFacade);
  teamFacade = inject(TeamFacade);
  route = inject(ActivatedRoute);

  columns$ = isBreakpoint('Handset').pipe(
    map((match) =>
      match
        ? ['time', 'team', 'update', 'remove']
        : ['time', 'byweekday', 'team', 'update', 'remove']
    ),
    shareReplay()
  );

  ngOnInit() {
    this.form.onInit();
    this.scheduleFacade.load();
    this.teamFacade.load();

    this.scheduleFacade.schedule$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((schedule) => {
        if (schedule) {
          this.form.patchValue(schedule);
          this.formEl.scrollIntoView({
            behavior: 'smooth',
          });
        }
      });

    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ id }) => {
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
