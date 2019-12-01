import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Region } from './region-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalAdminRegionService {
  constructor(private http: HttpClient) {}

  /**
   * Method returns endpoint that is related only to this module
   *
   * @returns {string} Returns full api url with included module
   * @memberof AccountService
   */
  getEndpointUrl(): string {
    return `${environment.serverUrl}region/`;
  }

  getRegionList(): Observable<Region[]> {
    return this.http.get<Region[]>(this.getEndpointUrl());
  }
}
