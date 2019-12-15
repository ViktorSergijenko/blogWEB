import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '@app/models/post.model';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/services/post-service';
import { MatSnackBar } from '@angular/material';
import { CredentialsService } from '@app/core';
import { Comment } from '@app/models/comment.model';
import { CommentService } from '@app/services/comment-service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-moderator-post-details',
  templateUrl: './moderator-post-details.component.html',
  styleUrls: ['./moderator-post-details.component.scss']
})
export class ModeratorPostDetailsComponent implements OnInit {
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
  ) { }

  ngOnInit() {
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
