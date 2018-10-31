import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;
  pages: { title: string; component: string; }[];
  menuCtrl: any;
  res : any;
  content: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public afAuth: AngularFireAuth) {

    this.pages = [
      {title:'Profile',component:'HomeMentorPage'},
      {title:'Group',component:'GroupPage'},
    ];


    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.res=localStorage.getItem('loggedInUser');
      console.log(this.res);
          if (this.res != null){
              this.rootPage = "HomePage";
          }
          else if (this.res === null) {
            this.rootPage = "LoginPage";
          }
        });
    
   
  }
  openPage(page){
    this.nav.setRoot(page.component)
  }

  logout(){
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.nav.setRoot("LoginPage");
  }
}

