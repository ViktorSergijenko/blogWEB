import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalAdminUserTableComponent } from './global-admin-user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { RegularUserService } from '@app/services/regular-user.service';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule,
     MatTableModule,
     MatInputModule,
     MatButtonModule,
     MatProgressSpinnerModule,
     MatSnackBarModule,
     MaterialModule,
     ReactiveFormsModule,
     TranslateModule,
     MatFormFieldModule,
    ],
  declarations: [GlobalAdminUserTableComponent],
  providers:[RegularUserService]
})
export class GlobalAdminUserTableModule {}
