import { Route } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { TeamContainer } from './containers/team/team.container';
import { ScheduleContainer } from './containers/schedule/schedule.container';

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
        path: 'reservas',
        component: ScheduleContainer,
      },
    ],
  },
];
