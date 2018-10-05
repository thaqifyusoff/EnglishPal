import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExerciseFlashcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise-flashcard',
  templateUrl: 'exercise-flashcard.html',
})
export class ExerciseFlashcardPage {

  

  type : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseFlashcardPage');
  }

}
