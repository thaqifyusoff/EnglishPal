import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  group: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group = navParams.get('data');
    console.log(this.group)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailsPage');
  }

}
