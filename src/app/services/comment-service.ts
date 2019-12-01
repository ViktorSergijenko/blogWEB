import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Comment } from '@app/models/comment.model';

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
    return `${environment.apiUrl}like`;
 }

 /**
     * Method gets object list
     *
     * @returns {Observable<Post[]>}
     * @memberof PostService
     */
    getPosts(): Observable<Comment[]> {
        return this.http.get<Comment[]>(this.getEndpointUrl());
    }

     /**
     * Method adds or updates object
     *
     * @param {Post} comment Post object that we want to edit or add
     * @returns {Observable<Post>}
     * @memberof PostService
     */
    addOrUpdate(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(this.getEndpointUrl(), comment);
    }

    /**
     * Method deletes object from system
     *
     * @param {string} commentId Id of an object that we want to delete
     * @returns {Observable<void>}
     * @memberof PostService
     */
    removePost(commentId: string): Observable<void> {
        return this.http.delete<void>(`${this.getEndpointUrl()}/${commentId}`);
    }

     /**
     * Method gets object from system by id
     *
     * @param {string} commentId Id of an object that we want to delete
     * @returns {Observable<Like>}
     * @memberof PostService
     */
    getCatalogByiD(commentId: string): Observable<Comment> {
        return this.http.get<Comment>(`${this.getEndpointUrl()}/${commentId}`);
    }
}