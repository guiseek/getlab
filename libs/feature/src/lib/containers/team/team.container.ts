import {
  Team,
  TeamFacade,
  UpdateTeamDto,
  CreateTeamDto,
} from '@getlab/data-access';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../../components';
import { EntityContainer } from '../base';
import { getColumns } from '../shared';
import { TeamForm } from '../../forms';
import { filter } from 'rxjs';

@Component({
  selector: 'getlab-team',
  templateUrl: './team.container.html',
  styleUrls: ['./team.container.scss'],
})
export class TeamContainer extends EntityContainer<Team> implements OnInit {
  form = new TeamForm();

  override label = 'Turma';

  teamFacade = inject(TeamFacade);
  route = inject(ActivatedRoute);

  columns$ = getColumns(
    ['ref', 'name', 'update', 'remove'],
    ['ref', 'update', 'remove']
  );

  ngOnInit() {
    this.teamFacade.load();

    this.teamFacade.team$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.form.patchValue(value ?? {}));

    this.route.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((params) => 'id' in params)
      )
      .subscribe(({ id }) => this.teamFacade.findTeam(id));
  }

  create(value: CreateTeamDto) {
    this.teamFacade.createTeam(value);
  }

  update(value: UpdateTeamDto) {
    this.teamFacade.updateTeam(value);
  }

  @ConfirmDialog<Team>({
    title: 'Remover turma',
    message: 'Tem certeza de que deseja continuar esta ação?',
    prop: 'ref',
  })
  onRemove({ id }: Team) {
    if (id) this.teamFacade.removeTeam(id);
  }
}
