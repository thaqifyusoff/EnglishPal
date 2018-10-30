import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { chat } from '../../models/chat';

@IonicPage()
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  group: any;
  username : any;
  chat = {} as chat;
  chats : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, private alertCtrl: AlertController, public afAuth: AngularFireAuth) {
    this.group = navParams.get('data');
    this.chats=this.afDatabase.list(`group/${this.group}/chat`,ref=>ref.orderByChild('date')).valueChanges();
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object<Profile>('profile/'+auth.uid).valueChanges().subscribe(e=>{
        this.username = e.username;
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailsPage');
  }

  leaveGroup() {

    let alert = this.alertCtrl.create({
      title: 'Leave Group',
      message: 'Are you sure you want to leave this group?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Leave',
          handler: () => {

            this.afAuth.authState.take(1).subscribe(auth => {
              var ref = this.afDatabase.database.ref(`group/${this.group}/members`);
              var ref1 = this.afDatabase.database.ref(`profile/${auth.uid}/group/`);
              ref.child(auth.uid).remove();
              ref1.child(this.group).remove();

              this.navCtrl.pop();

            });

          }
        }
      ]
    });
    alert.present();
  }
  public groupInfo(group : any){
    this.navCtrl.push("GroupInfoPage",{
      data:group
    });
  }
  send(message :any){
    this.chat.username=this.username;
    this.chat.message = message;
    this.afDatabase.list(`group/${this.group}/chat`).push(this.chat);

    console.log(this.username);
    console.log(message);
  }
}
