import {Routes} from '@angular/router';
import {AppLayout} from '@/layout/components/app.layout';
import { authGuard } from '@/core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'pages',
        canMatch: [authGuard],
        component: AppLayout,
        children: [
            {
                path: '',
                data: { breadcrumb: 'E-Commerce Dashboard' },
                loadComponent: () => import('@/pages/dashboard/ecommercedashboard').then((c) => c.EcommerceDashboard)
            },
            {
                path: 'reports',
                data: { breadcrumb: 'Reports' },
                loadChildren: () => import('@/pages/Reports/reports.routes')
            },

        ]
    },
    { path: 'auth', loadChildren: () => import('@/pages/auth/auth.routes') },
    {
        path: 'notfound',
        loadComponent: () => import('@/pages/notfound/notfound').then((c) => c.Notfound)
    },
    { path: 'gateway', loadChildren: () => import('@/pages/gateway/gateway.routes') },

    { path: '**', redirectTo: '/notfound' },
   
];
