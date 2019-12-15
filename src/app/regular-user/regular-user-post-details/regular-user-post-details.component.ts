import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Post } from '@app/models/post.model';
import { Comment } from '@app/models/comment.model';

import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/services/post-service';
import { CommentService } from '@app/services/comment-service';
import { ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-regular-user-post-details',
  templateUrl: './regular-user-post-details.component.html',
  styleUrls: ['./regular-user-post-details.component.scss']
})
export class RegularUserPostDetailsComponent implements OnInit, AfterViewInit {

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
    this.createCommentForm();
   }

  ngOnInit() {
    this.userId = this.credentialsService.credentials.id;
    this.getPost();
    this.getComments();
    this.commentForm.patchValue({ userId: this.credentialsService.credentials.id });
  }

  ngAfterViewInit() {
    window.document.getElementById('comment-field').scrollIntoView();
  }
  addNewComment() {
    this.commentService.addOrUpdate(this.commentForm.value).subscribe(() => {
      this.commentForm.patchValue({ id: '' });

      this.getComments();
    });
  }

  editComment(comment: Comment) {
    document.getElementById('comment-field').scrollIntoView();
    this.commentForm.patchValue({ id: comment.id });
    this.commentForm.patchValue({ text: comment.text });
  }

  deleteComment(id: string) {
    this.commentService.removePost(id).subscribe(() => {
      this.getComments();
    });
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
        this.initializeFormWithValues();
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

  private createCommentForm() {
    this.commentForm = this.formBuilder.group({
      postId: ['', Validators.required, Validators.email],
      userId: ['', Validators.required],
      text: ['', Validators.required],
      id: [undefined, Validators.required],
    });
  }
  

  private initializeFormWithValues() {
    this.commentForm.patchValue({ postId: this.post.id });
    this.commentForm.patchValue({ userId: this.credentialsService.credentials.id });
  }

}
