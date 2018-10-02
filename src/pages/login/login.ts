import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth} from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { Profile } from './../../models/profile';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from '@angular/fire/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth] //PROVIDER ANGULARFIRE AUTH

})
export class LoginPage {
  profile ={} as Profile;
  pro : Observable<Profile>;
  user ={} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,private alertCtrl: AlertController,private afDatabase: AngularFireDatabase ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  async login(user: User)
  {
    
      const result=this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      if(result){
      this.afAuth.authState.take(1).subscribe(auth => {
        if(auth){
           localStorage.setItem('userid',auth.uid );
           this.pro = this.afDatabase.object<Profile>('profile/'+auth.uid).valueChanges();
           this.pro.subscribe (p =>{
              if(p.ft ==1){
                this.navCtrl.setRoot("ProfilePage"); // IF USER FIRST TIME
              }
           })
           this.navCtrl.setRoot("DashboardStudentPage");

        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Login unsucessful',
            subTitle: 'Username or Password is incorrect',
            buttons: ['Dismiss']
          });
          alert.present();
          this.navCtrl.setRoot('LoginPage')
        }
      })
      }
     
   
   

  }
  signUp()
  {
    this.navCtrl.push("RegisterPage");
  }

   
}
