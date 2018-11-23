import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  qns : any[] = JSON.parse(localStorage.getItem('answered'));
  currentQuestion = 0;
  isValid = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.qns);
    this.qns = JSON.parse(localStorage.getItem('answered'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  next(last :any){
    this.isValid= false;
    console.log(last);
    if(last==true){
      this.currentQuestion = 0;
    }
    else{
      ++this.currentQuestion;
    }
  }

  previous(index :any){
    this.isValid= false;
    console.log(index);
    if(index==0){
      this.currentQuestion = 9;
    }
    else{
      --this.currentQuestion;
    }
  }
    

}
