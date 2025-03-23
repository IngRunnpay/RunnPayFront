import { Routes } from '@angular/router';

export default [
    {
      path: 'transactions',
      data: { breadcrumb: 'Transacciones' },
      loadComponent: () => import('./transactions/transaction-report.component').then(m => m.TransactionReportComponent),
    },
  ] as Routes;
  