import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../models/user';

/**
 * Generated class for the EditAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {
  user= {} as User;
  alert:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth , public afDatabase: AngularFireDatabase,private alertCtrl: AlertController) {
    this.alert = this.alertCtrl.create({
      title: 'Update sucessful',
      subTitle: 'User account updated,please re-login',
      buttons: ['Dismiss']}); 
      
    this.afAuth.authState.take(1).subscribe(auth => {
            this.user.email=auth.email;        
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  updateAccount(){
    this.afAuth.auth.currentUser.updateEmail(this.user.email)
    .then(()=>this.afAuth.auth.currentUser.updatePassword(this.user.password))
    .then(()=>this.alert.present())
    .then(()=>localStorage.setItem("userid",null))
    .then(()=>this.navCtrl.setRoot("LoginPage"));
 
  }

}
