import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Profile } from './../../models/profile';
import { Observable } from 'rxjs';
import {FirebaseObjectObservable} from '@angular/fire/database-deprecated';

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
   public p : FirebaseObjectObservable<Profile>;
   profileData :AngularFireObject<Profile> ;
   profile ={} as Profile;
   profileData$: AngularFireList<any[]>;
   name : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth , private afDatabase: AngularFireDatabase, public toast:ToastController) {
    this.p = this.afDatabase.object.apply(`profile/${name}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.afAuth.authState.take(1).subscribe(user => {
      if(user.uid ){
        this.name = user.uid;
        this.p = this.afDatabase.object.apply(`profile/${user.uid}`);
        localStorage.setItem('person', JSON.stringify(this.p));
      }
        
   
    })
  }

}
