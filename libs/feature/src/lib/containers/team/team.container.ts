import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CreateTeamDto, TeamFacade, UpdateTeamDto } from '@getlab/data-access';
import { MatButton } from '@angular/material/button';
import { Component, ViewChild } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { TeamForm } from '../../forms';

@Component({
  selector: 'getlab-team',
  templateUrl: './team.container.html',
  styleUrls: ['./team.container.scss'],
})
export class TeamContainer {
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
    readonly teamFacade: TeamFacade
  ) {
    this.teamFacade.load();
  }

  onSubmit() {
    if (this.teamForm.valid) {
      if (this.teamForm.hasId) {
        this.#update(this.teamForm.getValue());
      } else {
        this.#create(this.teamForm.getValue());
      }
      this.resetRef.nativeElement.click();
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
}
