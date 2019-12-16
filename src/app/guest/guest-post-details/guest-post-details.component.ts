import { Component, OnInit, ElementRef } from '@angular/core';
import { Post } from '@app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '@app/services/post-service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LikeService } from '@app/services/like-service';
import { CredentialsService } from '@app/core';
import { Comment } from '@app/models/comment.model';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '@app/services/comment-service';

@Component({
  selector: 'app-guest-post-details',
  templateUrl: './guest-post-details.component.html',
  styleUrls: ['./guest-post-details.component.scss']
})
export class GuestPostDetailsComponent implements OnInit {

  post: Post;
  comments: Comment[] = []
  isLoading: boolean;
  userId: string;
  commentForm: FormGroup;

  postsLoadingError: boolean;
  

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private myElement: ElementRef,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private commentService: CommentService
  ) {
   }

  ngOnInit() {
    this.userId = this.credentialsService.credentials.id;
    this.getPost();
    this.getComments();
  }

 

  private getPost() {
    this.isLoading = true;
    this.postService.getCatalogByiD(this.route.snapshot.paramMap.get('id'))
    .pipe(
      finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(post => {
        this.post = post;
      }, err => {
        this.postsLoadingError = true;
        this._snackBar.open(this.translate.instant('Something went try to reload page'), this.translate.instant('Close'), {
          duration: 4000,
      });
    });
  }

  private getComments() {
    this.commentService.getPosts(this.route.snapshot.paramMap.get('id'))
      .subscribe(comment => {
        this.comments = []
        this.comments = comment;
    });
  }
}
