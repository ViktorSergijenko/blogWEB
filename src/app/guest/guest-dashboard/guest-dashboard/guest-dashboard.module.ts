import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestDashboardComponent } from './guest-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from '@app/material.module';
import { PostModalComponent } from '@app/guest/post-modal-window/post-modal/post-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [GuestDashboardComponent,PostModalComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MaterialModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  entryComponents: [PostModalComponent]
  
})
export class GuestDashboardModule { }
