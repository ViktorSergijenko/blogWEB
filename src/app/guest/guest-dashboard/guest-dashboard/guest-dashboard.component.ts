import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '@app/models/post.model';
import { PostService } from '@app/services/post-service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { LikeService } from '@app/services/like-service';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss']
})
export class GuestDashboardComponent implements OnInit {
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

  postDetails(postId: string) {
    console.log('asd');
    this.router.navigate([this.route.snapshot.queryParams.redirect || `guest/dashboard/post/${postId}`], { replaceUrl: true });
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
