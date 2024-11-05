import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard-view/dashboard-view.component').then(
        (c) => c.DashboardViewComponent
      ),
  },
  {
    path: 'measure',
    loadComponent: () =>
      import('./views/measure-view/measure-view.component').then(
        (c) => c.MeasureViewComponent
      ),
  },
  {
    path: 'advice',
    loadComponent: () =>
      import('./views/advice-view/advice-view.component').then(
        (c) => c.AdviceViewComponent
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
