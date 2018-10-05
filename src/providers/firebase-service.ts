import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'rxjs/add/operator/map';




/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  user: AngularFireList<any>;
  constructor(public afd: AngularFireDatabase) {  }

  getUser(){
    return this.afd.list('/user/');
  }
  addUser(email1,password1,name1,type1){
    this.afd.list('/user/').push({
      email:email1,
      password:password1,
      name:name1,
      type:type1,
      });
  }  

}
