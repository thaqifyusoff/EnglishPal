import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  group: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, private alertCtrl: AlertController, public afAuth: AngularFireAuth) {
    this.group = navParams.get('data');
    console.log(this.group)
    this.user = this.afDatabase.list(`group/${this.group}/members`).valueChanges();

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
}
