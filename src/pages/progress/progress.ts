import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, empty } from 'rxjs';
import { Progress } from '../../models/progress';
 

/**
 * Generated class for the ProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  type : any ="lvl1";
  progress : AngularFireList<any[]>;
  data : any[]=[];
  s : any[] =[];
  c : any[] =[];
  count : number = 1;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth => {
    this.progress=this.afDatabase.list(`progress/${auth.uid}/${this.type}`,ref=>ref.orderByChild('date'))
    this.progress.valueChanges().subscribe(e=>{
      this.data = e;
      for(let d of this.data){
       this.s.push(d.score);
       this.c.push(this.count);
       this.count++;
      }
      this.generateChart(this.s,this.c);
    })



  });
  }
  getValue(lvl:any){
    this.lineChart.clear();  
    this.s =[];
    this.count =1;
    this.c = [];
    this.afAuth.authState.take(1).subscribe(auth => {
      this.progress=this.afDatabase.list(`progress/${auth.uid}/${lvl}`,ref=>ref.orderByChild('date'))
  
      this.progress.valueChanges().subscribe(e=>{
        this.data = e;
        for(let d of this.data){
          this.s.push(d.score);
          this.c.push(this.count);
          this.count++;
        }
      this.lineChart.data.datasets.data = this.s;
      this.lineChart.data.labels = this.c;
      this.lineChart.update();
      })
  
  
  
    });
  }

  generateChart(data,number){
    this.lineChart=new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: number,
          datasets: [
              {
                  label: "Score",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 3,
                  pointHitRadius: 0,
                  data: data,
                  spanGaps: false,
              }
          ]
          
      },
      options: {
        layout: {
          padding: {
              left: 0,
              right: 50,
              top: 0,
              bottom: 0
          }
      },
        legend: {
            display: false
        },
        scales:{
          xAxes: [{
            scaleLabel:{
              display : true,
              labelString: "Attemps" 
            } ,
             ticks:{
               display : false,
             } , 
             gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }//this will remove all the x-axis grid lines
           
          }],
          yAxes: [{
            scaleLabel:{
              display : true,
              labelString: "Score" //this will remove all the x-axis grid lines
            }   , 
            gridLines: {
             color: "rgba(0, 0, 0, 0)",
           }
          }]}
    }
      

  });
  }
}
