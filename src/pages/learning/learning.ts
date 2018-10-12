import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

/**
 * Generated class for the LearningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-learning',
  templateUrl: 'learning.html',
})
export class LearningPage {

  information: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
    this.http.get('assets/information.json').pipe(
      map(res => res.json().items)).
      subscribe(data =>{
      this.information = data;
    });
  }

  toggleSection(i){
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i,j){
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearningPage');
  }

}
