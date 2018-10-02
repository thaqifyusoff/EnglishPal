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
<<<<<<< HEAD
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string,component:string,openTab?:any}>;
  rootPage = 'HomePage';
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,) {
=======

  pages: Array<{title:string,component:string,openTab?:any}>;
  rootPage = 'HomePage';
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth) {
>>>>>>> 5183ae53249170eb66d4ce02a4edbc7706d84486
    this.pages = [
      {title:'Profile',component:'HomePage'},
      {title:'Progress',component:'HomePage'},
      {title:'Learning',component:'LearningPage'},
      {title:'Exercises',component:'ExercisesPage'},
      {title:'Simple',component:'SimplePastPage'},

    ];
  }

  openPage(page){
<<<<<<< HEAD
    this.nav.setRoot(page.component)
=======
    this.navCtrl.setRoot(page.component)
>>>>>>> 5183ae53249170eb66d4ce02a4edbc7706d84486
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardStudentPage');
  }
  
  logout(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
  }

}
