import { Routes } from '@angular/router';

export default [
  {
    path: 'checkout/payinformation/:token',
    loadComponent: () => import('./checkout/paymentInformation/payment-information.component').then(m => m.paymentInformation),
  },
    {
      path: 'checkout/payInformation/:token',
      loadComponent: () => import('./checkout/paymentInformation/payment-information.component').then(m => m.paymentInformation),
    },
    {
      path: 'checkout/payResume/:token',
      loadComponent: () => import('./checkout/payment-resume/payment-resume.component').then(m => m.PaymentResumeComponent),
    },
    {
      path: 'checkout/payresume/:token',
      loadComponent: () => import('./checkout/payment-resume/payment-resume.component').then(m => m.PaymentResumeComponent),
    },
  ] as Routes;
  