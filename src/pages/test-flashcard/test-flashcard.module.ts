import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestFlashcardPage } from './test-flashcard';

@NgModule({
  declarations: [
    TestFlashcardPage,
  ],
  imports: [
    IonicPageModule.forChild(TestFlashcardPage),
  ],
})
export class TestFlashcardPageModule {}
