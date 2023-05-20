import { Route } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { TeamContainer } from './containers/team/team.container';
import { ScheduleContainer } from './containers/schedule/schedule.container';
import { SpreadsheetContainer } from './containers/spreadsheet/spreadsheet.container';

export const featureRoutes: Route[] = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'turmas',
        component: TeamContainer,
      },
      {
        path: 'turmas/:id',
        component: TeamContainer,
      },
      {
        path: 'reservas',
        component: ScheduleContainer,
      },
      {
        path: 'reservas/:id',
        component: ScheduleContainer,
      },
      {
        path: 'planilha',
        component: SpreadsheetContainer,
      },
      {
        path: '**',
        redirectTo: 'planilha',
      },
    ],
  },
];
