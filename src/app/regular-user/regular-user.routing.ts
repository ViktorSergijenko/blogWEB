import { RegularUserComponent } from './regular-user.component';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { extract, AuthenticationGuard } from '@app/core';
import { RegularUserDashboardComponent } from './regular-user-dashboard/regular-user-dashboard.component';
import { NgModule} from '@angular/core';

const routes: Routes = [
    Shell.childRoutes([
      {
        path: 'regular-user',
        component: RegularUserComponent,
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
            component: RegularUserDashboardComponent,
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
  export class RegularUserRouter {}