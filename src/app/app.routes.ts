import {Routes} from '@angular/router'
import {DashboardComponent} from './pages/dashboard'

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'preview',
    loadComponent: () =>
      import('./pages/preview/preview.component').then(
        (c) => c.PreviewComponent
      ),
  },
  {
    path: 'teams',
    loadComponent: () =>
      import('./components/tables/team/team.component').then(
        (c) => c.TeamTableComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
]
