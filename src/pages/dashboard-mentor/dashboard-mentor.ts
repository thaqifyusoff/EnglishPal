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
  rootPage = 'HomeMentorPage';
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,) {
    this.pages = [
      {title:'Profile',component:'HomeMentorPage'},
      {title:'Group',component:'GroupPage'},
    ];
  }

  openPage(page){
    this.nav.setRoot(page.component)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardMentorPage');
  }
  
  logout(){
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.navCtrl.setRoot("LoginPage");
  }
}