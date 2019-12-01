import { Routes, RouterModule } from '@angular/router';
import { GlobalAdminComponent } from './global-admin.component';
import { Shell } from '@app/shell/shell.service';
import { NgModule } from '@angular/core';
import { GlobalAdminUserTableComponent } from './global-admin-user-table/global-admin-user-table.component';
import { GlobaAdminDashboardComponent } from './globa-admin-dashboard/globa-admin-dashboard.component';
import { GlobalAdminRegionsComponent } from './global-admin-regions/global-admin-regions.component';
import { extract, AuthenticationGuard } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'global',
      component: GlobalAdminComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          component: GlobaAdminDashboardComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('Dashboard'), permittedRole: extract('Global Admin') }
        },
        {
          path: 'user-table',
          component: GlobalAdminUserTableComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('User table'), permittedRole: extract('Global Admin') }
        },
        {
          path: 'regions',
          component: GlobalAdminRegionsComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('Regions'), permittedRole: extract('Global Admin') }
        }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GlobalAdminRoutingModule {}
