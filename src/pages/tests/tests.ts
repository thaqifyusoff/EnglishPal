import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase} from '@angular/fire/database';
import { Profile } from './../../models/profile';


/**
 * Generated class for the TestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {
  pro : Observable<Profile>;
  lvl: number;
  u1: string;
  isenabled1:boolean=true;
  isenabled2:boolean=false;
  isenabled3:boolean=false;
  isenabled4:boolean=false;
 
  get u() : any{
    return localStorage.getItem('userid');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private afDatabase: AngularFireDatabase) {
    this.u1=this.u;
    this.pro = this.afDatabase.object<Profile>('profile/'+this.u1).valueChanges();
    this.pro.subscribe(user => {
        this.lvl = user.level; 
        switch(this.lvl){
          case 1:
          this.isenabled1 = true;
          break;
          case 2:
          this.isenabled1 = true;
          this.isenabled2 = true;
          break;
          case 3:
          this.isenabled1 = true;
          this.isenabled2 = true;
          this.isenabled3 = true;
          break;
          case 4:
          this.isenabled1 = true;
          this.isenabled2 = true;
          this.isenabled3 = true;
          this.isenabled4 = true;
          break;
          default:
          this.isenabled1 = true;
          this.isenabled2 = true;
          this.isenabled3 = true;
          this.isenabled4 = true;
          break;

        }
    });

  }

  ionViewDidLoad() { }

  doTest(lvl :string){
    localStorage.setItem("level",lvl);
    this.navCtrl.setRoot("TestFlashcardPage");
  }

}
