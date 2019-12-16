import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestRoutingModule } from './guest.routing';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard/guest-dashboard.component';
import { GuestPostDetailsComponent } from './guest-post-details/guest-post-details.component';
import { MatButtonModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PostModalComponent } from '@app/regular-user/regular-user-dashboard/post-modal-window/post-modal/post-modal.component';
import { RegularUserService } from '@app/services/regular-user.service';
import { LikeService } from '@app/services/like-service';
import { CommentService } from '@app/services/comment-service';




@NgModule({
  declarations: [GuestComponent, GuestDashboardComponent, GuestPostDetailsComponent, GuestPostDetailsComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GuestRoutingModule,
    MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        MatFormFieldModule,
        MatDialogModule,
  ],
  providers: [RegularUserService, LikeService, CommentService],
  entryComponents: [PostModalComponent]
})
export class GuestModule { }
