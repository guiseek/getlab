import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@getlab/feature').then((m) => m.FeatureModule),
  },
];
