import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorComponent } from './moderator.component';
import { ModeratorRoutingModule } from './moderator.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PostModalComponent } from '@app/regular-user/regular-user-dashboard/post-modal-window/post-modal/post-modal.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ModeratorPostDetailsComponent } from './moderator-post-details/moderator-post-details.component';

@NgModule({
  imports: [BrowserModule,
    BrowserAnimationsModule,
     ModeratorRoutingModule,
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
  declarations: [ModeratorComponent, ModeratorDashboardComponent, ModeratorPostDetailsComponent],
  entryComponents: [PostModalComponent]
})
export class ModeratorModule {}
