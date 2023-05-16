import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout'
import {TeamStore, ScheduleStore} from 'src/app/shared/store'
import {Component} from '@angular/core'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

interface Service<T = unknown> {
  data$: Observable<T[]>
}

interface Card {
  title: string
  cols: number
  rows: number
  store: Service | null
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  cards: Observable<Card[]> = this.bpObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Turmas', cols: 2, rows: 1, store: this.teamStore},
          {title: 'Reservas', cols: 2, rows: 1, store: this.scheduleStore},
        ]
      }

      return [
        {title: 'Turmas', cols: 1, rows: 1, store: this.teamStore},
        {title: 'Reservas', cols: 1, rows: 1, store: this.scheduleStore},
      ]
    })
  )

  constructor(
    private bpObserver: BreakpointObserver,
    private scheduleStore: ScheduleStore,
    private teamStore: TeamStore
  ) {
    teamStore.data$.subscribe(console.log)
    scheduleStore.data$.subscribe(console.log)
  }
}
