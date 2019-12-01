import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private credentialService: CredentialsService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('No-Auth') === 'True') {
      return next.handle(request.clone());
    }

    if (this.credentialService.credentials != null) {
      const clonedreq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.credentialService.credentials.token)
      });
      return next.handle(clonedreq).pipe(
        tap(
          success => {},
          err => {
            // if (err.status === 401) {
            //   this.router.navigateByUrl('home');
            // }
          }
        )
      );
    } else {
      // this.router.navigateByUrl('home');
    }
  }
}
