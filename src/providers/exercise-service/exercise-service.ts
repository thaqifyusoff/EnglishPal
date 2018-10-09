import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database'
/*
  Generated class for the ExerciseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExerciseServiceProvider {

  constructor(public http: HttpClient,public afd : AngularFireDatabase) {
   
  }

  public getExercises(){
    return this.afd.list('exercises/pastTense').valueChanges();
  }

  
}
