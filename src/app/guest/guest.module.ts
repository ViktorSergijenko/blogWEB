import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { GuestDashboardModule } from './guest-dashboard/guest-dashboard/guest-dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestRoutingModule } from './guest.routing';
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [GuestComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GuestDashboardModule,
    GuestRoutingModule,
    MatCardModule,
  ]
})
export class GuestModule { }
