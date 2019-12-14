import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NgModule } from '@angular/core';
import { ModeratorComponent } from './moderator.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { extract, AuthenticationGuard } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'moderator',
      component: ModeratorComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'dashboard',
          component: ModeratorDashboardComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('Dashboard'), permittedRole: extract('Moderator') }
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
export class ModeratorRoutingModule {}
