import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth} from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';

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

  user ={} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,private alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  async login(user: User)
  {
    try{
      const result=this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      if(result){
      this.afAuth.authState.take(1).subscribe(auth => {
        if(auth){
          this.navCtrl.setRoot("HomePage");
           localStorage.setItem('userid',auth.uid );

        }
        else{this.navCtrl.setRoot('LoginPage')
        }
      })
      }}
      catch (e){
        let alert = this.alertCtrl.create({
          title: 'Login unsucessful',
          subTitle: 'Username or Password is incorrect',
          buttons: ['Dismiss']
        });
        alert.present();
        this.navCtrl.setRoot("LoginPage");
      }
    
   
   

  }
  signUp()
  {
    this.navCtrl.push("RegisterPage");
  }

   
}
