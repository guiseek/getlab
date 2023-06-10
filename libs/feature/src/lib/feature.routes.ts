import { Route } from '@angular/router';
import { FeatureComponent } from './feature.component';
import {
  UserContainer,
  TeamContainer,
  ScheduleContainer,
  SpreadsheetContainer,
} from './containers';

export const featureRoutes: Route[] = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'turmas/:id',
        component: TeamContainer,
      },
      {
        path: 'turmas',
        component: TeamContainer,
      },
      {
        path: 'usuarios/:id',
        component: UserContainer,
      },
      {
        path: 'usuarios',
        component: UserContainer,
      },
      {
        path: 'reservas/:id',
        component: ScheduleContainer,
      },
      {
        path: 'reservas',
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
