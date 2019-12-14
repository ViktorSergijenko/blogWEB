import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/models/post.model';
import { PostService } from '@app/services/post-service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog
  ) { 
    this.sortOption = this.route.snapshot.paramMap.get('sort');
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.isLoading = true;
    this.postService.getPosts()
    .pipe(
      finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(posts => {
        this.postList = posts;
      }, err => {
        this.postsLoadingError = true;
        this._snackBar.open(this.translate.instant('Something went try to reload page'), this.translate.instant('Close'), {
          duration: 4000,
        });
      });
  }


}
