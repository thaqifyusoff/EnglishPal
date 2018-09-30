import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {ProfilePageModule} from './../profile/profile.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    //IMPORT MODULE
    ProfilePageModule,

  ],
  exports: [
    HomePage,
  ]
})
export class HomePageModule {}
