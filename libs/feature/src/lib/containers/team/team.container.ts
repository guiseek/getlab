import {
  Team,
  TeamFacade,
  UpdateTeamDto,
  CreateTeamDto,
} from '@getlab/data-access';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CONFIRM_DIALOG, ConfirmDialog } from '../../components';
import { Subject, map, shareReplay, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { register } from '@getlab/util-core';
import { TeamForm } from '../../forms';

@Component({
  selector: 'getlab-team',
  templateUrl: './team.container.html',
  styleUrls: ['./team.container.scss'],
})
export class TeamContainer implements OnInit, OnDestroy {
  #subject = new Subject<void>();

  @ViewChild('resetRef', { static: true })
  resetButton!: MatButton;
  get resetRef() {
    return this.resetButton._elementRef;
  }

  teamForm = new TeamForm();

  columns$ = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    map((match) => {
      return match
        ? ['ref', 'update', 'remove']
        : ['ref', 'name', 'update', 'remove'];
    }),
    shareReplay()
  );

  constructor(
    private bpObserver: BreakpointObserver,
    readonly teamFacade: TeamFacade,
    readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.teamFacade.load();

    this.teamFacade.team$.pipe(takeUntil(this.#subject)).subscribe((team) => {
      if (team) this.teamForm.patchValue(team);
    });

    this.route.params.pipe(takeUntil(this.#subject)).subscribe(({ id }) => {
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

  onSubmit() {
    if (this.teamForm.valid) {
      if (this.teamForm.hasId) {
        this.#update(this.teamForm.getValue());
      } else {
        this.#create(this.teamForm.getValue());
      }
      this.resetRef.nativeElement.click();
      this.teamForm.init();
    } else {
      this.teamForm.markAllAsTouched();
    }
  }

  #create(value: CreateTeamDto) {
    this.teamFacade.createTeam(value);
  }

  #update(value: UpdateTeamDto) {
    this.teamFacade.updateTeam(value);
  }

  ngOnDestroy() {
    this.#subject.next();
    this.#subject.complete();
  }
}
