import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Progress } from '../../models/progress';
import { Profile } from '../../models/profile';



@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  qns : any[] = JSON.parse(localStorage.getItem('answered'));
  seconds = parseInt(localStorage.getItem('timetaken'));
  type = localStorage.getItem('level');
  correctAnswer : number = 0;
  questions: Observable<any>;
  score : number;
  status = false;
  progress = {} as Progress;
  pro: Observable<Profile>;
  user = {} as Profile;
  lvl : number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase, public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {  }

  ionViewDidLoad() {
    this.qns.forEach(i =>{
        if(i.answer == i.answered){
          this.correctAnswer++;
        }
        else{
          console.log("salah");
        }
    })
    if(this.type =="lvl1"){
        this.lvl =1;         
    }
    else if(this.type =="lvl2"){
      this.lvl =2;  
    }
    else if(this.type =="lvl3"){
      this.lvl =3;  
    }
    else if(this.type =="lvl4"){
      this.lvl =4;  
    }
    this.score = (this.correctAnswer/5)*100;
    this.progress.score = this.score;
    this.progress.timetaken = this.seconds;
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`progress/${auth.uid}/${this.type}`).push(this.progress) //FOR LIST
      this.pro = this.afDatabase.object<Profile>('profile/'+auth.uid).valueChanges();
      this.pro.subscribe(person =>{
        this.user.level = person.level;
        if(this.score >= 70){
          this.status = true;
           if(this.user.level <= 5){
              if(this.user.level <= this.lvl){
              this.user.level = this.lvl+1;
              this.afDatabase.object(`profile/${auth.uid}`).update({
                level:this.user.level}) ;
          }
        }
        }
      })  
  
    });
 

  }

  displayTimeElapsed(){
    return Math.floor(this.seconds/3600) + ':'+ Math.floor(this.seconds/60)+ ':'+ Math.floor(this.seconds%60);
  }

  goHome(){
    localStorage.setItem('level',"");
    localStorage.setItem("answered","");
    localStorage.setItem("timetaken","");
    this.navCtrl.setRoot("TestsPage");
  }

  restart(){
    localStorage.setItem("answered","");
    localStorage.setItem("timetaken","");
    this.navCtrl.setRoot("TestFlashcardPage");
  }

  review(){
    this.navCtrl.push("ReviewPage");
  }

}
