import {
  Team,
  TeamFacade,
  UpdateTeamDto,
  CreateTeamDto,
} from '@getlab/data-access';
import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialog } from '../../components';
import { EntityContainer } from '../base';
import { TeamForm } from '../../forms';

@Component({
  selector: 'getlab-team',
  templateUrl: './team.container.html',
  styleUrls: ['./team.container.scss'],
})
export class TeamContainer extends EntityContainer<Team> implements OnInit {
  form = new TeamForm();

  override label = 'Turma';

  bpObserver = inject(BreakpointObserver);
  teamFacade = inject(TeamFacade);
  route = inject(ActivatedRoute);

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['ref', 'update', 'remove']
        : ['ref', 'name', 'update', 'remove'];
    }),
    shareReplay()
  );

  ngOnInit() {
    this.teamFacade.load();

    this.teamFacade.team$.pipe(takeUntil(this.subject)).subscribe((team) => {
      if (team) {
        this.form.patchValue(team);
        this.formEl.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });

    this.route.params.pipe(takeUntil(this.subject)).subscribe(({ id }) => {
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
