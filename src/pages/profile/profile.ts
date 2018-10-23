import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from '@angular/fire/auth';
import { Profile } from './../../models/profile';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from 'ionic-angular';
import {storage,initializeApp} from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = ({ 
    level:1,
    ft:2,
   }) as Profile;

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
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile);
      })
      if(this.profile.type == "Student"){
        this.navCtrl.setRoot("DashboardStudentPage");
      }
      else if(this.profile.type =="Mentor"){
        this.navCtrl.setRoot("DashboardMentorPage");
      }
  }

}
