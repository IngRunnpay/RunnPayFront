import { Routes } from '@angular/router';

export default [
    {
      path: 'transactions',
      data: { breadcrumb: 'Pay In' },
      loadComponent: () => import('./report-transacrtion/report-transacrtion.component').then(m => m.ReportTransacrtionComponent),
    },
    {
      path: 'dispersion',
      data: { breadcrumb: 'Pay Out' },
      loadComponent: () => import('./report-dispersion/report-dispersion.component').then(m => m.ReportDispersionComponent),
    },
  ] as Routes;
  