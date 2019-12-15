import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Post } from '@app/models/post.model';

@Injectable({
    providedIn: 'root'
})

export class PostService {
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
        return `${environment.apiUrl}post`;
    }

    /**
     * Method gets post list
     *
     * @returns {Observable<Post[]>}
     * @memberof PostService
     */
    getPosts(sort: string): Observable<Post[]> {
        return this.http.get<Post[]>(this.getEndpointUrl() + `/${sort}`);
    }

     /**
     * Method adds or updates post
     *
     * @param {Post} post Post object that we want to edit or add
     * @returns {Observable<Post>}
     * @memberof PostService
     */
    addOrUpdate(post: Post): Observable<Post> {
        return this.http.post<Post>(this.getEndpointUrl(), post);
    }

    /**
     * Method deletes post from system
     *
     * @param {string} postId Id of an post that we want to delete
     * @returns {Observable<void>}
     * @memberof PostService
     */
    removePost(postId: string): Observable<void> {
        return this.http.delete<void>(`${this.getEndpointUrl()}/${postId}`);
    }

     /**
     * Method gets post from system by id
     *
     * @param {string} postId Id of an post that we want to delete
     * @returns {Observable<Post>}
     * @memberof PostService
     */
    getCatalogByiD(postId: string): Observable<Post> {
        return this.http.get<Post>(`${this.getEndpointUrl()}/${postId}`);
    }
}

