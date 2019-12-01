import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalAdminUserTableComponent } from './global-admin-user-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [CommonModule, MatTableModule],
  declarations: [GlobalAdminUserTableComponent]
})
export class GlobalAdminUserTableModule {}
