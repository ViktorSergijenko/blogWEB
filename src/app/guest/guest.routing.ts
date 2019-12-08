import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NgModule } from '@angular/core';
import { extract, AuthenticationGuard } from '@app/core';
import { GuestComponent } from './guest.component';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard/guest-dashboard.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'guest',
      component: GuestComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard/best',
          pathMatch: 'full',
          canActivate: [AuthenticationGuard],
          data: { title: extract('Dashboard'), permittedRole: extract('RegularUser')}
        },
        {
          path: 'dashboard/:sort',
          component: GuestDashboardComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('Dashboard'), permittedRole: extract('RegularUser')}
        },
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GuestRoutingModule {}