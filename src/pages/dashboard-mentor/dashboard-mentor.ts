import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the DashboardMentorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard-mentor',
  templateUrl: 'dashboard-mentor.html',
})
export class DashboardMentorPage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string,component:string,openTab?:any}>;
  rootPage = 'HomePage';
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,) {
    this.pages = [
      {title:'Profile',component:'HomePage'},
      {title:'Progress',component:'HomePage'},
      {title:'Forum',component:'HomePage'},
      {title:'Group',component:'HomePage'},
     


    ];
  }

  openPage(page){
    this.nav.setRoot(page.component)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardStudentPage');
  }
  
  logout(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
  }
}