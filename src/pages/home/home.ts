import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Profile } from './../../models/profile';
import { Observable } from 'rxjs';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

   profileData :AngularFireObject<Profile> ;
   profile ={} as Profile;
   profileData$: AngularFireList<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth , private afDatabase: AngularFireDatabase, public toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid ){
        this.toast.create({
          message: `Welcome to APP_NAME,{data.email}`,
          duration:3000
        }).present();  
        this.profileData$ = this.afDatabase.list(`profile/${data.uid}`);
       
        
      }
      else{
        this.toast.create({
          message:`Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }

}
