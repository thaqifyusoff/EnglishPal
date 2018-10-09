import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { ExerciseFlashcardPage } from '../exercise-flashcard/exercise-flashcard';

/**
 * Generated class for the ExercisesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
})
export class ExercisesPage {
  @ViewChild(Nav)nav:Nav;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisesPage');
  }

  public navigateTo(text : string){
    this.navCtrl.push("ExerciseFlashcardPage", {
      data:text,

    });
  }

}
