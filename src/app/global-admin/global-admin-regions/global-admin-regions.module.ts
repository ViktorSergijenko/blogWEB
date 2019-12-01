import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalAdminRegionsComponent } from './global-admin-regions.component';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalAdminRegionService } from './global-admin-region.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [MatTableModule],
  declarations: [GlobalAdminRegionsComponent],
  providers: [GlobalAdminRegionService]
})
export class GlobalAdminRegionsModule {}
