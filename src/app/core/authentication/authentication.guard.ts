import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService,private route: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated()) {
      let role = route.data['permittedRole'] as string;
      console.log(role);
      console.log(this.credentialsService.credentials.roleName);
      if (role) {
        if (this.credentialsService.credentials.roleName === role) {
          return true;
        } else {
          switch (this.credentialsService.credentials.roleName) {
            case 'Global Admin':
              this.router.navigate([this.route.snapshot.queryParams.redirect || '/global'], { replaceUrl: true });
              break;
            case 'Moderator':
              this.router.navigate([this.route.snapshot.queryParams.redirect || '/moderator'], { replaceUrl: true });
              break;
              case 'RegularUser':
              this.router.navigate([this.route.snapshot.queryParams.redirect || '/regularUser'], { replaceUrl: true });
              break;
              case 'guest':
              this.router.navigate([this.route.snapshot.queryParams.redirect || '/guest'], { replaceUrl: true });
              break;
            default:
              break;
          }
          return false;
        }
      }
      return true;
    }
    log.debug('Not authenticated, redirecting and adding redirect url...');
    return false;
  }
}
