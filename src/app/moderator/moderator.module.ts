import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorComponent } from './moderator.component';
import { ModeratorDashboardModule } from './moderator-dashboard/moderator-dashboard.module';
import { ModeratorRoutingModule } from './moderator.routing';

@NgModule({
  imports: [CommonModule, ModeratorDashboardModule, ModeratorRoutingModule],
  declarations: [ModeratorComponent]
})
export class ModeratorModule {}
