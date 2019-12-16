import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '@app/models/user.model';

@Injectable({providedIn: 'root'})
export class RegularUserService {
    constructor( 
       private http: HttpClient
        ) { }

     /**
    * Method returns endpoint that is related only to this module
    *
    * @returns {string} Returns full api url with included module
    * @memberof PostService
    */
   getEndpointUrl(): string {
    return `${environment.serverUrl}user`;
}

/**
 * Method gets post list
 *
 * @returns {Observable<Post[]>}
 * @memberof PostService
 */
getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getEndpointUrl() + `/GetAllUsers`);
}
addModerator(id: string): Observable<User> {
    return this.http.get<User>(this.getEndpointUrl() + `/addModerator/${id}`);
}
removeModerator(id: string): Observable<User> {
    return this.http.get<User>(this.getEndpointUrl() + `/removeModerator/${id}`);
}
    
}