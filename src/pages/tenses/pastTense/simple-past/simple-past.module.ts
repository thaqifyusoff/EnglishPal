import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimplePastPage } from './simple-past';

@NgModule({
  declarations: [
    SimplePastPage,
  ],
  imports: [
    IonicPageModule.forChild(SimplePastPage),
  ],
})
export class SimplePastPageModule {}
