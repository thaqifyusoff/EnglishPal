import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';
import { Exercise } from './../../models/exercise'
import { Observable } from 'rxjs';

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
  currentQuestion = 0;
  exercise: Exercise[] = [];
  questions: Observable<any>;
  type: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    this.type = this.navParams.get('data');
    let i = 0;
    this.questions = this.afd.list('exercises/' + this.type).valueChanges();

    //FOR ACCESS INSIDE DATA
    /* this.questions.subscribe(e => {
      this.exercise = e.forEach(ex => {
        this.exercise = ex;
        console.log(this.exercise);
      })

    }); */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseFlashcardPage');
  }
  submitCurrentQuestion() {
    // Make changes to save the answer

    ++this.currentQuestion;
  }
}
