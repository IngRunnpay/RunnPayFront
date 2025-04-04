import { Routes } from '@angular/router';

export default [
    {
      path: 'transactions',
      data: { breadcrumb: 'Transacciones' },
      loadComponent: () => import('./report-transacrtion/report-transacrtion.component').then(m => m.ReportTransacrtionComponent),
    },
    {
      path: 'dispersion',
      data: { breadcrumb: 'Dispersión' },
      loadComponent: () => import('./report-dispersion/report-dispersion.component').then(m => m.ReportDispersionComponent),
    },
  ] as Routes;
  