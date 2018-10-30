import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

/**
 * Generated class for the OtherProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-profile',
  templateUrl: 'other-profile.html',
})
export class OtherProfilePage {
  profile ={} as Profile;
  pro : Observable<Profile>;
  user= {} as User;
  u: string;
  email : string;
 
 constructor( private afDatabase: AngularFireDatabase, public navParams: NavParams,public navCtrl: NavController,public afAuth:AngularFireAuth) {
  this.u = navParams.get('data');
  console.log(this.u);
  this.email = navParams.get('email');
   this.pro = this.afDatabase.object<Profile>('profile/'+this.u).valueChanges();
   this.pro.subscribe(user => {
       this.profile.username = user.username;
       this.profile.fullname = user.fullname;
       this.profile.level = user.level;
       this.profile.type = user.type;

   } );

 }

 ionViewDidLoad() { }
 
 viewProgress(){
   this.navCtrl.push("OtherProgressPage",{
     data:this.navParams.get('data')
   })
 }
}