import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@app/models/user.model';

export class LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}
  /**
   * Method returns endpoint that is related only to this module
   *
   * @returns {string} Returns full api url with included module
   * @memberof AccountService
   */
  getEndpointUrl(): string {
    return `${environment.serverUrl}user/`;
  }
  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<Credentials>(this.getEndpointUrl() + 'Login', context, { headers: reqHeader });
  }

  register(newUser: User): Observable<User> {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<User>(this.getEndpointUrl() + 'register', newUser, { headers: reqHeader });
  }

  getUserProfile(): Observable<Credentials> {
    return this.http.get<Credentials>(this.getEndpointUrl() + 'GetProfile');
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
