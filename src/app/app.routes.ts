import {Routes} from '@angular/router'
import {ScheduleTableComponent, TeamTableComponent} from './components/tables'
import {DashboardComponent} from './pages/dashboard'
import {PreviewComponent} from './pages/preview'

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'preview',
    component: PreviewComponent,
  },
  {
    path: 'teams',
    component: TeamTableComponent,
  },
  {
    path: 'schedules',
    component: ScheduleTableComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
]
