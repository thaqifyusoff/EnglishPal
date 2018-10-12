import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';
import { Exercise } from './../../models/exercise'
import { Observable } from 'rxjs';
import { Answer } from './../../models/answer';
import { ChangeDetectorRef } from '@angular/core';
import {AnswerMssg} from './../../models/answermssg';

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
  answer = {} as Answer;
  mssg = {} as AnswerMssg;
  isValid = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase,private cdRef:ChangeDetectorRef) {
    this.type = this.navParams.get('data');
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
  //detect any changes since use hidden
  submitCurrentQuestion() {
    // Make changes to save the answer
    this.isValid= false;
    ++this.currentQuestion;
  }
  check(ans : any){
    this.isValid = true;
    if(this.answer.answered ==ans){
      this.mssg.status = "Correct"
      this.mssg.answer = ans;
      this.mssg.icon = "checkmark-circle-outline";
    }    
    else{
      this.mssg.status = "Wrong"
      this.mssg.answer = ans ;
      this.mssg.icon = "close-circle-outline";
    }
  }
}
