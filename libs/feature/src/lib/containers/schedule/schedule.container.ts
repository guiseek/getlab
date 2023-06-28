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
import { ConfirmDialog } from '../../components';
import { ScheduleForm } from '../../forms';
import { EntityContainer } from '../base';
import { getColumns } from '../shared';
import { filter } from 'rxjs';

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

  columns$ = getColumns(
    ['time', 'byweekday', 'team', 'update', 'remove'],
    ['time', 'team', 'update', 'remove']
  );

  ngOnInit() {
    this.form.onInit();

    this.scheduleFacade.load();
    this.teamFacade.load();

    this.scheduleFacade.schedule$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.form.patchValue(value ?? {}));

    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((params) => 'id' in params)
      )
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
