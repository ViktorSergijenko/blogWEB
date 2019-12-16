import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalAdminComponent } from './global-admin.component';
import { GlobalAdminRoutingModule } from './global-admin.routing';
import { GlobalAdminUserTableModule } from './global-admin-user-table/global-admin-user-table.module';
import { GlobaAdminDashboardModule } from './globa-admin-dashboard/globa-admin-dashboard.module';
import { GlobalAdminRegionsModule } from './global-admin-regions/global-admin-regions.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [GlobalAdminComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GlobalAdminRoutingModule,
    GlobalAdminUserTableModule,
    GlobaAdminDashboardModule,
    GlobalAdminRegionsModule,
    
  ]
})
export class GlobalAdminModule {}
