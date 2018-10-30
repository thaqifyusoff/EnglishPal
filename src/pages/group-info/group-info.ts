import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the GroupInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-info',
  templateUrl: 'group-info.html',
})
export class GroupInfoPage {
  group: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, private alertCtrl: AlertController, public afAuth: AngularFireAuth) {
    this.group = navParams.get('data');
    console.log(this.group)
    this.user = this.afDatabase.list(`group/${this.group}/members`).valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupInfoPage');
  }
  
  public viewProfile(g :any){
    this.navCtrl.push("OtherProfilePage",{
      data:g.userId, 
      email:g.email
    });
}
}
