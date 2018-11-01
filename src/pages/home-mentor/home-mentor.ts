import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
import { Profile } from './../../models/profile';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
/**
 * Generated class for the HomeMentorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-mentor',
  templateUrl: 'home-mentor.html',
})
export class HomeMentorPage {
  profile ={} as Profile;
  pro : Observable<Profile>;
  user= {} as User;
  u: string;
 
 constructor( private afDatabase: AngularFireDatabase,public navCtrl: NavController,public afAuth:AngularFireAuth,public menuCtrl: MenuController) {
  this.menuCtrl.enable(true, 'mentorMenu');
  this.menuCtrl.enable(false, 'studentMenu');
   this.u=localStorage.getItem('userid');
   this.pro = this.afDatabase.object<Profile>('profile/'+this.u).valueChanges();
   this.pro.subscribe(user => {
       this.profile.username = user.username;
       this.profile.fullname = user.fullname;
       this.profile.level = user.level;
       this.profile.type = user.type;

   } );
   this.afAuth.authState.take(1).subscribe(auth => {
   this.user.email=auth.email;        
   })
 }

 ionViewDidLoad() {                    }
 
editProfile(){
  this.navCtrl.push("EditPage");
}

editAccount(){
  this.navCtrl.push("EditAccountPage");
}
}

