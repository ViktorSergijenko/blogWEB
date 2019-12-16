import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { Like } from '@app/models/like.model';

@Injectable({
    providedIn: 'root'
})

export class LikeService {
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
    return `${environment.serverUrl}like`;
 }

 /**
     * Method gets object list
     *
     * @returns {Observable<Post[]>}
     * @memberof PostService
     */
    getPosts(): Observable<Like[]> {
        return this.http.get<Like[]>(this.getEndpointUrl());
    }

     /**
     * Method adds or updates object
     *
     * @param {Post} like Post object that we want to edit or add
     * @returns {Observable<Post>}
     * @memberof PostService
     */
    addOrUpdate(like: Like): Observable<Like> {
        return this.http.post<Like>(this.getEndpointUrl(), like);
    }

    /**
     * Method deletes object from system
     *
     * @param {string} likeId Id of an object that we want to delete
     * @returns {Observable<void>}
     * @memberof PostService
     */
    removePost(likeId: string): Observable<void> {
        return this.http.delete<void>(`${this.getEndpointUrl()}/${likeId}`);
    }

     /**
     * Method gets object from system by id
     *
     * @param {string} likeId Id of an object that we want to delete
     * @returns {Observable<Like>}
     * @memberof PostService
     */
    getCatalogByiD(likeId: string): Observable<Like> {
        return this.http.get<Like>(`${this.getEndpointUrl()}/${likeId}`);
    }
}