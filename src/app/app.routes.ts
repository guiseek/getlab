import {Routes} from '@angular/router'
import {DashboardComponent} from './pages/dashboard'
import {PreviewComponent} from './pages/preview'
import {TeamTableComponent} from './components/tables'

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
    path: '**',
    redirectTo: 'dashboard',
  },
]
