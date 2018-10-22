import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav,NavController, NavParams,MenuController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
/**
 * Generated class for the DashboardStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard-student',
  templateUrl: 'dashboard-student.html',
})
export class DashboardStudentPage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string,component:string,openTab?:any}>;
  rootPage = 'HomePage';
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,) {
    this.pages = [
      {title:'Profile',component:'HomePage'},
      {title:'Progress',component:'ProgressPage'},
      {title:'Learning',component:'LearningPage'},
      {title:'Exercises',component:'ExercisesPage'},
      {title:'Tests',component:'TestsPage'},


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
