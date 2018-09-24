import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList } from '@angular/fire/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service';
import { AngularFireAuth} from '@angular/fire/auth';
import { User } from '../../models/user';
import { AlertController } from 'ionic-angular';


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
 
  user= {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService:FirebaseServiceProvider , public afAuth:AngularFireAuth,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //TO ADD TO FIREBASE
  addUser(email,password,name,type){
    this.firebaseService.addUser(email,password,name,type);
  }
  //CLOSE

  async register(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
    if (result){
      let alert = this.alertCtrl.create({
        title: 'Login sucessful',
        subTitle: 'Try logging in now',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.push("LoginPage");
    }
    }
    catch(e){
      console.error(e);
    }
  }

}
