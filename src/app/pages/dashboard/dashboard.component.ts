import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout'
import {ScheduleService, TeamService} from '../../shared/services'
import {Component} from '@angular/core'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { TeamStore } from 'src/app/shared/store/team.store'

interface Service<T = unknown> {
  data$: Observable<T[]>
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards: Observable<
    {
      title: string
      cols: number
      rows: number
      store: Service | null
    }[]
  > = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Turmas', cols: 2, rows: 1, store: this.teamStore},
          {title: 'Reservas', cols: 2, rows: 1, store: this.scheduleService},
        ]
      }

      return [
        {title: 'Turmas', cols: 1, rows: 1, store: this.teamStore},
        {title: 'Reservas', cols: 1, rows: 1, store: this.scheduleService},
      ]
    })
  )

  constructor(
    private bpObserver: BreakpointObserver,
    private teamStore: TeamStore,
    private scheduleService: ScheduleService
  ) {
    console.log(teamStore)
    teamStore.data$.subscribe(console.log)
  }
}
