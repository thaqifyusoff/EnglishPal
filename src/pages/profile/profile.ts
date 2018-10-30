import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from '@angular/fire/auth';
import { Profile } from './../../models/profile';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from 'ionic-angular';
import {storage,initializeApp} from 'firebase';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  pro : Observable<Profile>
  profile = ({ 
    level:1,
    ft:2,
   }) as Profile;
  u: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,private alertCtrl: AlertController, public afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    let alert = this.alertCtrl.create({
      title: 'Welcome New User !',
      subTitle: 'Please fill in your information',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  createProfile(){
        this.u=localStorage.getItem('userid');
        this.afDatabase.object(`profile/${this.u}`).set(this.profile);
        this.navCtrl.setRoot("LoginPage");
     
  }

}
