import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RegularUserComponent } from './regular-user.component';
import { RegularUserService } from '@app/services/regular-user.service';
import { RegularUserDashboardComponent } from './regular-user-dashboard/regular-user-dashboard.component';
import { RegularUserRouter } from './regular-user.routing';
import { PostModalComponent } from './regular-user-dashboard/post-modal-window/post-modal/post-modal.component';
import { MatDialogModule, MatFormFieldModule, MatSnackBarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RegularUserRouter,
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
    exports: [],
    declarations: [RegularUserComponent, RegularUserDashboardComponent, PostModalComponent],
    providers: [RegularUserService],
    entryComponents: [PostModalComponent]
})
export class RegularUserModule { }
