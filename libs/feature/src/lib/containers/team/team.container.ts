import {
  Team,
  TeamFacade,
  UpdateTeamDto,
  CreateTeamDto,
} from '@getlab/data-access';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay } from 'rxjs';
import { ConfirmDialog } from '../../components';
import { EntityContainer } from '../base';
import { isBreakpoint } from '../shared';
import { TeamForm } from '../../forms';

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

  columns$ = isBreakpoint('Handset').pipe(
    map((match) =>
      match ? ['ref', 'update', 'remove'] : ['ref', 'name', 'update', 'remove']
    ),
    shareReplay()
  );

  ngOnInit() {
    this.teamFacade.load();

    this.teamFacade.team$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((team) => {
        if (team) {
          const behavior = 'smooth';
          this.form.patchValue(team);
          this.formEl.scrollIntoView({ behavior });
        }
      });

    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ id }) => {
        if (id) this.teamFacade.findTeam(id);
      });
  }

  @ConfirmDialog<Team>({
    title: 'Remover turma',
    message: 'Tem certeza de que deseja continuar esta ação?',
    prop: 'ref',
  })
  onRemove({ id }: Team) {
    if (id) this.teamFacade.removeTeam(id);
  }

  create(value: CreateTeamDto) {
    this.teamFacade.createTeam(value);
  }

  update(value: UpdateTeamDto) {
    this.teamFacade.updateTeam(value);
  }
}
