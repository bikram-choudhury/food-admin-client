import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { authenticatedGuard } from './guards/authenticatedGuard';
import { AuthGuard } from './guards/authGuard';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        {
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule',
        },{
            path:'hub',
            loadChildren: './masters/hub/hub.module#hubModule'
        },{
            path: 'outlet',
            loadChildren: './masters/outlet/outlet.module#outletModule'
        },{
            path: 'tax',
            loadChildren: './masters/tax/tax.module#taxModule'
        },{
            path: 'dish',
            loadChildren: './masters/dish/dish.module#dishModule'
        },{
            path: 'dish-category',
            loadChildren: './masters/dish-category/dish-category.module#DishCategoryModule'
        }
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
