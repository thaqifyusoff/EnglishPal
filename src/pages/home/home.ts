import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase} from '@angular/fire/database';
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
   profile ={} as Profile;
   pro : Observable<Profile>;

   u1: string;
  
  get u() : any{
    return localStorage.getItem('userid');
  }

  constructor( private afDatabase: AngularFireDatabase) {
    this.u1=this.u;
    this.pro = this.afDatabase.object<Profile>('profile/'+this.u1).valueChanges();
    this.pro.subscribe(user => {
        this.profile.username = user.username;
        this.profile.fullname = user.fullname;
        this.profile.level = user.level;
        this.profile.email = user.email;
        this.profile.type = user.type;

    } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.pro = this.afDatabase.object<Profile>('profile/'+this.u1).valueChanges();
    
                    }


  

}
