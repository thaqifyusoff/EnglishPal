import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearningPage } from './learning';

@NgModule({
  declarations: [
    LearningPage,
  ],
  imports: [
    IonicPageModule.forChild(LearningPage),
  ],
  exports: [
    LearningPage,
  ]
})
export class LearningPageModule {}
