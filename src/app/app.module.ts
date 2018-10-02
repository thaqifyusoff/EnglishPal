import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms'; //NG MODEL
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

import { MyApp } from './app.component';
//MODULE

//PROVIDER
import { FirebaseServiceProvider } from '../providers/firebase-service';
import { ProfileProvider } from '../providers/profile/profile';
import { UserProvider } from '../providers/user/user';

//FIREBASE CONFIG 
var firebaseConfig = {
    apiKey: "AIzaSyCG2G6q8qc89S95hdPRXiutrbjF4DmIS7o",
    authDomain: "englishpal-bd139.firebaseapp.com",
    databaseURL: "https://englishpal-bd139.firebaseio.com",
    projectId: "englishpal-bd139",
    storageBucket: "englishpal-bd139.appspot.com",
    messagingSenderId: "935323531837"
  };

  
@NgModule({
  declarations: [
    MyApp,
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule, //http module
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig), //firebase
    AngularFireAuthModule,

  

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
  
    {provide: ErrorHandler, useClass: IonicErrorHandler}, //DELETE TO TURN OFF ERROR HANDLER
    FirebaseServiceProvider,
    ProfileProvider,
    UserProvider,

  ]
})
export class AppModule {}
