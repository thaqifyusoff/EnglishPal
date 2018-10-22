import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Answer } from './../../models/answer';
import { ChangeDetectorRef } from '@angular/core';
import {AnswerMssg} from './../../models/answermssg';

@IonicPage()
@Component({
  selector: 'page-exercise-flashcard',
  templateUrl: 'exercise-flashcard.html',
})
export class ExerciseFlashcardPage {
  currentQuestion = 0;
  questions: Observable<any>;
  type: string;
  answer = {} as Answer;
  mssg = {} as AnswerMssg;
  isValid = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase,private cdRef:ChangeDetectorRef) {
    this.type = this.navParams.get('data');
    this.questions = this.afd.list('exercises/' + this.type).valueChanges();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseFlashcardPage');
  }

  next(last :any){
    this.isValid= false;
    console.log(last);
    if(last==true){
      this.questions = this.afd.list('exercises/' + this.type).valueChanges();
      this.currentQuestion = 0;
    }
    else{
      ++this.currentQuestion;
    }
    

    
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

  last(){
    console.log("LAST");
  }

}
