import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  qns : any[] = JSON.parse(localStorage.getItem('answered'));
  seconds = parseInt(localStorage.getItem('timetaken'));
  correctAnswer : number = 0;
  questions: Observable<any>;
  type: string;
  score : number;
  status = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
 
  }

  ionViewDidLoad() {
    this.qns.forEach(i =>{
      console.log(i.answer);
      console.log(i.answered);
        if(i.answer == i.answered){
          this.correctAnswer++;
        }
        else{
          console.log("salah");
        }
    })

    this.score = (this.correctAnswer/5)*100;
    if(this.score >= 70){
      this.status = true;
    }
  }

  displayTimeElapsed(){
    return Math.floor(this.seconds/3600) + ':'+ Math.floor(this.seconds/60)+ ':'+ Math.floor(this.seconds%60);
  }

  goHome(){
    this.navCtrl.setRoot("TestsPage");
  }

  restart(){
    localStorage.setItem("answered","");
    localStorage.setItem("timetaken","");
    this.navCtrl.setRoot("TestFlashcardPage");
  }

}
