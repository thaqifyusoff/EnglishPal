import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Group } from '../../models/group';
import { Members } from '../../models/members';

/**
 * Generated class for the GroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  group = {} as Group;
  members = {} as Members;
  groupList: any;
  searchGroup: any;
  result: any;
  isValid: any = false;

 
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`profile/${auth.uid}/group`).valueChanges().subscribe(e => {
        this.groupList = e;
      });
    });
  }


  joinGroup() {
    this.afAuth.authState.take(1).subscribe(auth => {
      var ref = this.afDatabase.database.ref(`profile/${auth.uid}/group`);
      ref.once("value").then(s => {
        let status = false;
        s.forEach(st => {
          if (st.val().name == this.result) {
            return status = true; //dah ada
          }
        });
        if (status != false) {
          let alreadyJoin = this.alertCtrl.create({
            title: 'Already in the group !',
            subTitle: 'You already joined the group',
            buttons: ['Dismiss']
          });
          alreadyJoin.present();
        }
        else {
          this.group.name = this.result;
          this.members.userId = auth.uid;
          this.members.email = auth.email;
          this.afDatabase.object(`group/${this.result}/members/${auth.uid}`).set(this.members);
          this.afDatabase.object(`profile/${auth.uid}/group/${this.group.name}`).set(this.group);
          let successfulJoin = this.alertCtrl.create({
            title: 'Successful',
            subTitle: 'Successfuly join the group',
            buttons: ['Ok']
          });
          successfulJoin.present();
        }

        console.log(status)
          ;

      });
    });
  }

  addGroup() {
    let alert = this.alertCtrl.create({
      title: 'Create Group',
      inputs: [
        {
          name: 'GroupName',
          placeholder: 'Group Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            this.afAuth.authState.take(1).subscribe(auth => {
              this.members.userId = auth.uid;
              this.members.email = auth.email;
              this.group.name = data.GroupName;
              var ref = this.afDatabase.database.ref(`group/${data.GroupName}`);
              ref.once("value").then(s => {
                let st = s.exists();
                if (st == true) {
                  let groupExist = this.alertCtrl.create({
                    title: 'Group Already Exist',
                    subTitle: 'Group already exist create a new group with another unique name',
                    buttons: ['Dismiss']
                  });
                  groupExist.present();
                }
                else {
                  this.afDatabase.object(`group/${data.GroupName}/members/${auth.uid}`).set(this.members);
                  this.afDatabase.object(`profile/${auth.uid}/group/${this.group.name}`).set(this.group);
                  let groupCreated = this.alertCtrl.create({
                    title: 'Successful',
                    subTitle: 'Successfuly created the group',
                    buttons: ['Ok']
                  });
                  groupCreated.present();
                }
              })



            })
          }
        }
      ]
    });
    alert.present();
  }

  search(ev: any) {
    if (ev.target.value != null && ev.target.value != '') {
      this.isValid = true;
      var ref = this.afDatabase.database.ref(`group/${this.searchGroup}`);
      ref.once("value").then(s => {
        let st = s.exists();
        if (st == true) {
          this.result = this.searchGroup;
        }
        else {
          this.result = "No Results";
        }
      })
    }
    else {
      this.isValid = false;
    }

  }

  viewGroup(group : any){
    this.navCtrl.push("GroupDetailsPage",{
      data:group.name
    });
  }
}

