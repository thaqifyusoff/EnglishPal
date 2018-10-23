import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardMentorPage } from './dashboard-mentor';

@NgModule({
  declarations: [
    DashboardMentorPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardMentorPage),
  ],
})
export class DashboardMentorPageModule {}
