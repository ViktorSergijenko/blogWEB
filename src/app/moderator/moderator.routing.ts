import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NgModule } from '@angular/core';
import { ModeratorComponent } from './moderator.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { extract, AuthenticationGuard } from '@app/core';
import { ModeratorPostDetailsComponent } from './moderator-post-details/moderator-post-details.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'moderator',
      component: ModeratorComponent,
      children: [
        {
          path: '',
          redirectTo: 'dashboard/best',
          pathMatch: 'full',
          canActivate: [AuthenticationGuard],
          data: { title: extract('posts'), permittedRole: extract('Moderator')}
        },
        {
          path: 'dashboard/:sort',
          component: ModeratorDashboardComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('posts'), permittedRole: extract('Moderator') }
        },
        {
          path: 'dashboard/post/:id',
          component: ModeratorPostDetailsComponent,
          canActivate: [AuthenticationGuard],
          data: { title: extract('post'), permittedRole: extract('Moderator')}
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
