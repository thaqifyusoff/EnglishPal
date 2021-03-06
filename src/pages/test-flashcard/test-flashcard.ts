import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Answer } from './../../models/answer';
import { ChangeDetectorRef } from '@angular/core';
import {AnswerMssg} from './../../models/answermssg';
import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-test-flashcard',
  templateUrl: 'test-flashcard.html',
})
export class TestFlashcardPage {
  currentQuestion = 0;
  questions: Observable<any>;
  type: string;
  answer = {} as Answer;
  mssg = {} as AnswerMssg;
  isValid = false;

  //GENERAL
  qns : any[]; //store questions
  seconds : number =0 ; //total time taken
  timer; //time take for participant
  qnProgress: number=0 ;
  group : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase,private cdRef:ChangeDetectorRef) {
    this.group= new FormGroup({
      option: new FormControl(),
 
    });
    this.type = localStorage.getItem('level');
    this.questions = this.afd.list('tests/'+this.type).valueChanges();
    //ADD ON 
    this.questions.subscribe(
      (data:any)=>{
        this.qns = data; //store questions in array
        this.startTimer();
      }
    );
  }

  //TIMER
  startTimer(){
    this.timer = setInterval(()=>{
      this.seconds++;
      localStorage.setItem('timetaken',this.seconds.toString());
    },1000);
  }
  displayTimeElapsed(){
    return Math.floor(this.seconds/3600) + ':'+ Math.floor(this.seconds/60)+ ':'+ Math.floor(this.seconds%60);
  }
  ionViewDidLoad() { }

  submit(last : any,i : number){
    this.isValid= false;
    this.qns[this.qnProgress].answered = this.answer.answered; //create new attribute call answered and store it
    this.qnProgress++;
    this.group.reset();
    if(last==true){
      this.currentQuestion = 0;
      localStorage.setItem('answered',JSON.stringify(this.qns));
      localStorage.setItem('timetaken',this.seconds.toString());
      this.navCtrl.setRoot("ResultPage");
    }
    else{
      ++this.currentQuestion;
    }
  }

 
}
