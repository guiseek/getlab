import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {ScheduleComponent, TeamFormComponent} from './components/forms'
import {MatDialog} from '@angular/material/dialog'
import {map, shareReplay} from 'rxjs/operators'
import {ScheduleService, TeamService} from './shared/services'
import {Schedule, Team} from './shared/interfaces'
import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import { TeamStore } from './shared/store'

@Component({
  selector: 'app-shell',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar>Menu</mat-toolbar>
        <mat-action-list>
          <button mat-list-item (click)="openTeamForm()">Turma</button>
          <button mat-list-item (click)="openScheduleForm()">Reserva</button>
        </mat-action-list>
        <mat-divider></mat-divider>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active"
            >Dashboard</a
          >
          <a mat-list-item routerLink="/preview" routerLinkActive="active"
            >Visualizar</a
          >
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span class="brand">GetLab</span>
        </mat-toolbar>
        <main>
        <ng-content select="router-outlet"></ng-content>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .brand {
        font-family: 'Schoolbell', cursive;
        font-size: 2rem;
      }

      :host main {
        padding: 16px;
      }
      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }
    `,
  ],
})
export class AppShell {
  title = 'getlab'

  isHandset$: Observable<boolean> = this.bpObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  constructor(
    private bpObserver: BreakpointObserver,
    private scheduleService: ScheduleService,
    private teamStore: TeamStore,
    private matDialog: MatDialog
  ) {
    console.log(teamStore)
    teamStore.data$.subscribe(console.log)
    this.teamStore.load()
  }

  openTeamForm() {
    const team$ = this.matDialog
      .open(TeamFormComponent, {
        disableClose: true,
      })
      .afterClosed()
    team$.subscribe((team: Team) => {
      if (team) {
        this.teamStore.add(team)
      }
    })
  }

  openScheduleForm() {
    const schedule$ = this.matDialog.open(ScheduleComponent).afterClosed()
    schedule$.subscribe((schedule: Schedule) => {
      console.log(schedule)

      if (schedule) {
        this.scheduleService.add(schedule)
      }
    })
  }
}