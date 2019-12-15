import { Component, OnInit } from '@angular/core';
import { Post } from '@app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '@app/services/post-service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LikeService } from '@app/services/like-service';
import { CredentialsService } from '@app/core';
import { finalize } from 'rxjs/operators';
import { Like } from '@app/models/like.model';
import { PostModalComponent } from '@app/regular-user/regular-user-dashboard/post-modal-window/post-modal/post-modal.component';

@Component({
  selector: 'app-moderator-dashboard',
  templateUrl: './moderator-dashboard.component.html',
  styleUrls: ['./moderator-dashboard.component.scss']
})
export class ModeratorDashboardComponent implements OnInit {
  sortOption: string;
  postList: Post[] = [];
  isLoading: boolean;
  postsLoadingError: boolean;
  userId: string;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog,
    private likeService: LikeService,
    private router: Router,
    private credentialsService: CredentialsService,
  ) { 
    this.userId = this.credentialsService.credentials.id;
    this.sortOption = this.route.snapshot.paramMap.get('sort');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.getPosts();
  }

  deletePost(postId: string) {
    this.postService.removePost(postId).subscribe(() => {
      this.getPosts();
    });
  }

  editPost(post: Post) {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '700px',
      data: post
    }).afterClosed().subscribe(result => {
      this.getPosts();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '700px',
    }).afterClosed().subscribe(result => {
      this.getPosts();
    });
  }

  likePost(post: Post) {
    var like = new Like();
    console.log(post);
    like.postId = post.id;
    like.userId = this.credentialsService.credentials.id
    var isLikeExist = post.likes.find(x => x.userId == this.credentialsService.credentials.id)
    if (!isLikeExist) {
      this.likeService.addOrUpdate(like).subscribe(like => {
        this.getPosts();
      });
    } else {
        this.likeService.removePost(isLikeExist.id).subscribe(() => {
          this.getPosts();
        });
    }
  }

  postDetails(postId: string) {
    console.log('asd');
    this.router.navigate([this.route.snapshot.queryParams.redirect || `moderator/dashboard/post/${postId}`], { replaceUrl: true });
  }

  private getPosts() {
    this.isLoading = true;
    this.postService.getPosts(this.sortOption)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(posts => {
        this.postList = [];
        this.postList = posts;
      }, err => {
        this.postsLoadingError = true;
        this._snackBar.open(this.translate.instant('Something went try to reload page'), this.translate.instant('Close'), {
          duration: 4000,
      });
    });
  }
}
