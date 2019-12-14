import { Component, OnInit } from '@angular/core';
import { PostModalComponent } from './post-modal-window/post-modal/post-modal.component';
import { Post } from '@app/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/services/post-service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-regular-user-dashboard',
  templateUrl: './regular-user-dashboard.component.html',
  styleUrls: ['./regular-user-dashboard.component.scss']
})
export class RegularUserDashboardComponent implements OnInit {

  sortOption: string;
  postList: Post[] = [];
  numberito: number = 1;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var a = result;
      console.log(result);
    });
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
