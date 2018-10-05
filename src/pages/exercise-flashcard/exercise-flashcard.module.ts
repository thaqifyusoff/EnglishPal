import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseFlashcardPage } from './exercise-flashcard';

@NgModule({
  declarations: [
    ExerciseFlashcardPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseFlashcardPage),
  ],
})
export class ExerciseFlashcardPageModule {}
