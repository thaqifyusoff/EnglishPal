import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList } from '@angular/fire/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service';
import { AngularFireAuth} from '@angular/fire/auth';
import { User } from '../../models/user';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import {Profile} from './../../models/profile';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth] //PROVIDER ANGULARFIRE AUTH
})
export class RegisterPage {
  
  profile = ({ 
    level:1,
    ft:1,
   }) as Profile;

  user= {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService:FirebaseServiceProvider 
    , public afDatabase: AngularFireDatabase,public afAuth:AngularFireAuth,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  async register(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    if (result){
      let alert = this.alertCtrl.create({
        title: 'Register sucessful',
        subTitle: 'Try logging in now',
        buttons: ['Dismiss']
      });
      alert.present();
      
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() =>  this.navCtrl.push("LoginPage"))
        ;
      })
     
    }
    }
    catch(e){
      console.error(e);
    }
  }

}
