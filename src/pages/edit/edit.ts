import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  pro : Observable<Profile>;
  u: string;
  profile ={} as Profile;
  alert:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth,private alertCtrl: AlertController) {
    this.alert = this.alertCtrl.create({
      title: 'Update sucessful',
      subTitle: 'User Profile Updated',
      buttons: ['Dismiss']});
    
    this.u=localStorage.getItem('userid');
    this.pro = this.afDatabase.object<Profile>('profile/'+this.u).valueChanges();
    this.pro.subscribe(user => {
      this.profile.username = user.username;
      this.profile.fullname = user.fullname;
  } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }
  
  updateProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
              this.afDatabase.object(`profile/${auth.uid}`).update({
                fullname:this.profile.fullname,
                username:this.profile.username   
              }).then(()=>this.alert.present());
             
      });
    }
  
}
