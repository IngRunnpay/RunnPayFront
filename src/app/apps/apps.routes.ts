import {Routes} from '@angular/router';

export default [
    {
        path: 'tasklist',
        loadComponent: () => import('./tasklist').then((c) => c.TaskList),
        data: { breadcrumb: 'Tasklist' }
    },
] as Routes;
