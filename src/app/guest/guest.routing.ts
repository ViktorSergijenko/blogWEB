import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NgModule } from '@angular/core';
import { extract } from '@app/core';
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
          pathMatch: 'full'
        },
        {
          path: 'dashboard/:sort',
          component: GuestDashboardComponent,
          data: { title: extract('Dashboard')}
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