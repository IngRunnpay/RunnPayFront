import { Routes } from '@angular/router';

export default [
    {
      path: 'transactions',
      data: { breadcrumb: 'PayIn' },
      loadComponent: () => import('./report-transacrtion/report-transacrtion.component').then(m => m.ReportTransacrtionComponent),
    },
    {
      path: 'dispersion',
      data: { breadcrumb: 'PayOut' },
      loadComponent: () => import('./report-dispersion/report-dispersion.component').then(m => m.ReportDispersionComponent),
    },
    {
      path: 'conciliation',
      data: { breadcrumb: 'Conciliation' },
      loadComponent: () => import('./report-conciliation/report-conciliation.component').then(m => m.ReportConciliationComponent),
    },
  ] as Routes;
  