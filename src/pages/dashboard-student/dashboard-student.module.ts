import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardStudentPage } from './dashboard-student';
import {HomePageModule} from './../home/home.module';
import {ExercisesPageModule} from './../exercises/exercises.module';
import {LearningPageModule} from './../learning/learning.module';

@NgModule({
  declarations: [
    DashboardStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardStudentPage),
    HomePageModule,
    ExercisesPageModule,

  ],
})
export class DashboardStudentPageModule {}
