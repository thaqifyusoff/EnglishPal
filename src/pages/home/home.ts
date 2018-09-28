import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from '@angular/fire/database';
import { Profile } from './../../models/profile';
import { Observable } from 'rxjs';
import {FirebaseObjectObservable,FirebaseListObservable} from '@angular/fire/database-deprecated';
import { switchMap} from 'rxjs/operators';
import { createElement } from '@angular/core/src/view/element';

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
   public p : AngularFireList<any>;
   profileData :AngularFireObject<Profile> ;
   profile ={} as Profile;
   profileData$: AngularFireList<any[]>;
   name : string;
   pro : Observable<Profile>;
   p1 : FirebaseObjectObservable<Profile>;
   p2 : any;
   p4 : FirebaseListObservable<Profile>;
   u1: string;
  
  get u() : any{
    return localStorage.getItem('userid');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth , private afDatabase: AngularFireDatabase) {
    this.u1=this.u;
    var ref=this.afDatabase.database.ref('profile/'+this.u1);
    this.pro = this.afDatabase.object<Profile>('profile/'+this.u1).valueChanges();
    this.pro.subscribe(user => {
        this.profile.username = user.username;
        this.profile.fullname = user.fullname;
        this.profile.level = user.level;
        this.profile.phonenumber = user.phonenumber;
        this.profile.type = user.type;

    } );
    
    
   
    
    
 
  }

  get p3():any {
    return this.p2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.pro = this.afDatabase.object<Profile>('profile/'+this.u1).valueChanges();
    
                    }

  logout(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
  }

  

}
