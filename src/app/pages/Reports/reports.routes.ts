import { Routes } from '@angular/router';

export default [
    {
      path: 'transactions',
      data: { breadcrumb: 'Transacciones' },
      loadComponent: () => import('./report-transacrtion/report-transacrtion.component').then(m => m.ReportTransacrtionComponent),
    },
  ] as Routes;
  