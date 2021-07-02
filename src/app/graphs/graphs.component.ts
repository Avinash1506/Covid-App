import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import { faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';

//import * as Chart from 'chart.js';
// import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit {
  faChartLine = faChartLine;
  faChartPie = faChartPie;
  faSearch = faSearch;
  constructor(
    private ds: DataService,
    private router: Router,
    private ar: ActivatedRoute,
    private appObj: AppComponent
  ) {}
  b;
  country;
  active;
  total;
  deaths;
  recovered;
  arr;
  data = [];
  labels = [];
  colors = [];
  colors1 = [];
  stateFromUser;
  stateFromApi;
  stateDetails;
  districtDet;
  districtDetails;
  i;
  labels1;
  data1;
  color2;
  url;
  state = 'no state';
  public canvas: any;
  stateName(state) {
    this.stateName = state['state'];
    if (sessionStorage.getItem('state')) {
      sessionStorage.removeItem('state');
      // this.state='no state';
    }
    sessionStorage.setItem('state', state['state']);
    this.state = state['state'];
    this.router.navigate(['./stats'], {
      queryParams: { state: JSON.stringify(state['state']) },
    });
  }
  clearState() {
    sessionStorage.removeItem('state');
    this.state = 'no state';
    this.router.navigate(['./stats']);
  }
  ngOnInit(): void {
    this.appObj.underline('stats');
    this.url = this.router.url;
    if (this.url.length == 6) {
      sessionStorage.removeItem('state');
    }
    this.ar.queryParams.subscribe((params) => {
      console.log(params.state);
      if (params.state == undefined) {
        this.country = true;
        this.state = 'no state';
        this.ds.data1().subscribe((data) => {
          this.active = data['statewise'][0]['active'];
          this.total = data['statewise'][0]['confirmed'];
          this.deaths = data['statewise'][0]['deaths'];
          this.recovered = data['statewise'][0]['recovered'];
          this.arr = data['statewise'].slice(1, data['statewise'].length);
          this.i = 0;
          for (let val of this.arr) {
            if (val['state'] == 'State Unassigned') {
              break;
            }
            this.i++;
          }
          console.log('State is', this.arr[this.i]['state']);
          this.arr.splice(this.i, 1);
          //  console.log(this.arr);
          this.labels = [];
          this.data = [];
          this.colors = [];
          this.colors1 = [];
          for (let i = 0; i < this.arr.length; i++) {
            this.labels.push(this.arr[i]['state']);
          }
          for (let i = 0; i < this.arr.length; i++) {
            this.data.push(this.arr[i]['confirmed']);
          }
          for (let i = 0; i < this.arr.length; i++) {
            this.colors.push('rgb(252, 118, 118)');
          }
          for (let i = 0; i < this.arr.length; i++) {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            this.colors1.push(`rgb(${r},${g},${b})`);
          }
          const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
          const ctx = canvas.getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.labels,
              datasets: [
                {
                  label: '# of Cases',
                  data: this.data,
                  borderColor: this.colors,
                  backgroundColor: this.colors,
                  color: this.colors,
                  fill: false,
                  borderWidth: 5,
                },
              ],
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            },
          });
          const canvas1 = <HTMLCanvasElement>document.getElementById('canvas2');
          if (canvas1) canvas1.remove();
          let parentElement = document.querySelector('.divChart2');
          let canvEle = document.createElement('canvas');
          canvEle.setAttribute('id', 'canvas2');
          parentElement.append(canvEle);
          const canvas11 = <HTMLCanvasElement>(
            document.getElementById('canvas2')
          );
          const ctx1 = canvas11.getContext('2d');
          var myChart1 = new Chart(ctx1, {
            type: 'pie',
            data: {
              labels: this.labels,
              datasets: [
                {
                  label: '# of Cases',
                  data: this.data,
                  borderColor: this.colors,
                  backgroundColor: this.colors1,
                  color: this.colors1,
                  fill: false,
                  borderWidth: 0.1,
                },
              ],
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            title: {
              display: true,
              text: 'First chart',
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            },
          });
          // myChart1.render();
          this.labels1 = [];
          this.data1 = [];
          this.color2 = [];
          this.labels1.push('Active');
          this.labels1.push('Recovered');
          this.labels1.push('Deaths');
          this.data1.push(this.active);
          this.data1.push(this.recovered);
          this.data1.push(this.deaths);
          this.color2.push('rgba(250, 43, 48, 1)');
          this.color2.push('rgba(105, 231, 115, 1)');
          this.color2.push('rgba(172, 189, 170, 1)');
          const canvas3 = <HTMLCanvasElement>document.getElementById('canvas3');
          if (canvas3) canvas3.remove();
          let parentElement1 = document.querySelector('.divChart3');
          let canvEle1 = document.createElement('canvas');
          canvEle1.setAttribute('id', 'canvas3');
          parentElement1.append(canvEle1);
          const canvas111 = <HTMLCanvasElement>(
            document.getElementById('canvas3')
          );
          const ctx11 = canvas111.getContext('2d');
          var myChart1 = new Chart(ctx11, {
            type: 'pie',
            data: {
              labels: this.labels1,
              datasets: [
                {
                  label: '# of Cases',
                  data: this.data1,
                  borderColor: this.color2,
                  backgroundColor: this.color2,
                  color: this.color2,
                  fill: false,
                  borderWidth: 0.1,
                },
              ],
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            title: {
              display: true,
              text: 'First chart',
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            },
          });
        });
      } else {
        this.country = false;
        this.stateDetails = JSON.parse(params.state);
        this.stateFromUser = sessionStorage.getItem('state');
        this.state = this.stateFromUser;
        if (this.stateDetails !== this.stateFromUser) {
          //navigate to page not found
        }
        let i;
        this.ds.data1().subscribe((data) => {
          for (i = 0; i < data['statewise'].length; i++) {
            this.stateFromApi = data['statewise'][i]['state'];
            if (this.stateFromApi == this.stateFromUser) {
              break;
            }
          }
          if (i == data['statewise'].length) {
            this.router.navigate(['./**']);
          } else {
            this.active = data['statewise'][i]['active'];
            this.total = data['statewise'][i]['confirmed'];
            this.deaths = data['statewise'][i]['deaths'];
            this.recovered = data['statewise'][i]['recovered'];
            this.b = true;
          }
          this.labels1 = [];
          this.data1 = [];
          this.color2 = [];
          this.labels1.push('Active');
          this.labels1.push('Recovered');
          this.labels1.push('Deaths');
          this.data1.push(this.active);
          this.data1.push(this.recovered);
          this.data1.push(this.deaths);
          this.color2.push('rgba(250, 43, 48, 1)');
          this.color2.push('rgba(105, 231, 115, 1)');
          this.color2.push('rgba(172, 189, 170, 1)');
          const canvas3 = <HTMLCanvasElement>document.getElementById('canvas3');
          if (canvas3) canvas3.remove();
          let parentElement1 = document.querySelector('.divChart3');
          let canvEle1 = document.createElement('canvas');
          canvEle1.setAttribute('id', 'canvas3');
          parentElement1.append(canvEle1);
          const canvas111 = <HTMLCanvasElement>(
            document.getElementById('canvas3')
          );
          const ctx11 = canvas111.getContext('2d');
          var myChart1 = new Chart(ctx11, {
            type: 'pie',
            data: {
              labels: this.labels1,
              datasets: [
                {
                  label: '# of Cases',
                  data: this.data1,
                  borderColor: this.color2,
                  backgroundColor: this.color2,
                  color: this.color2,
                  fill: false,
                  borderWidth: 0.1,
                },
              ],
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            title: {
              display: true,
              text: 'First chart',
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            },
          });
        });
        this.ds.data2().subscribe((data) => {
          this.districtDetails = data[this.stateFromUser];

          this.districtDet = this.districtDetails['districtData'];
          this.arr = [];
          for (let val in this.districtDet) {
            if (
              val != 'Foreign Evacuees' &&
              val != 'Other State' &&
              val != 'Unknown' &&
              val != 'Airport Quarantine' &&
              val != 'Italians' &&
              val != 'CAPF Personnel' &&
              val != 'Other Region' &&
              val != 'Others' &&
              val != 'State Pool' &&
              val != 'Evacuees' &&
              val != 'Foreign Evacuees' &&
              val != 'Railway Quarantine'
            )
              this.arr.push({
                district: val,
                active: this.districtDet[val]['active'],
                total: this.districtDet[val]['confirmed'],
                deaths: this.districtDet[val]['deceased'],
                recovered: this.districtDet[val]['recovered'],
              });
          }

          this.labels = [];
          this.data = [];
          this.colors = [];
          this.colors1 = [];

          for (let i = 0; i < this.arr.length; i++) {
            this.labels.push(this.arr[i]['district']);
          }

          for (let i = 0; i < this.arr.length; i++) {
            this.data.push(this.arr[i]['total']);
          }
          for (let i = 0; i < this.arr.length; i++) {
            this.colors.push('rgb(252, 118, 118)');
          }
          for (let i = 0; i < this.arr.length; i++) {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            this.colors1.push(`rgb(${r},${g},${b})`);
            //console.log(this.colors1[i]);
          }
          // console.log('Labels is ', this.labels);
          // console.log('data is ', this.data);
          const canvas2 = <HTMLCanvasElement>document.getElementById('canvas1');
          const ctx2 = canvas2.getContext('2d');
          var myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
              labels: this.labels,
              datasets: [
                {
                  data: this.data,
                  borderColor: this.colors,
                  backgroundColor: this.colors,
                  color: this.colors,
                  fill: false,
                  borderWidth: 5,
                },
              ],
            },
            // axisY: {
            // interval: 10000,
            // },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            },
          });
          // myChart2.render();
          const canvas100 = <HTMLCanvasElement>(
            document.getElementById('canvas2')
          );
          if (canvas100) canvas100.remove();
          let parentElement = document.querySelector('.divChart2');
          let canvEle = document.createElement('canvas');
          canvEle.setAttribute('id', 'canvas2');
          parentElement.append(canvEle);
          const canvas22 = <HTMLCanvasElement>(
            document.getElementById('canvas2')
          );
          const ctx3 = canvas22.getContext('2d');
          console.log(ctx3);
          var myChart3 = new Chart(ctx3, {
            type: 'pie',
            data: {
              labels: this.labels,
              datasets: [
                {
                  label: '# of Cases',
                  data: this.data,
                  borderColor: this.colors1,
                  backgroundColor: this.colors1,
                  color: this.colors1,
                  fill: false,
                  borderWidth: 5,
                },
              ],
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            },
          });
        });

        //--------------------------------------------------
      }
    });
  }
  // let chart = new CanvasJS.Chart('chartContainer', {
  //   animationEnabled: true,
  //   exportEnabled: true,
  //   title: {
  //     text: 'Basic Column Chart in Angular',
  //   },
  //   data: [
  //     {
  //       type: 'column',
  //       dataPoints: [
  //         { y: 71, label: 'Apple' },
  //         { y: 55, label: 'Mango' },
  //         { y: 50, label: 'Orange' },
  //         { y: 65, label: 'Banana' },
  //         { y: 95, label: 'Pineapple' },
  //         { y: 68, label: 'Pears' },
  //         { y: 28, label: 'Grapes' },
  //         { y: 34, label: 'Lychee' },
  //         { y: 14, label: 'Jackfruit' },
  //       ],
  //     },
  //   ],
  // });

  //chart.render();
  // createLineChart(labels, dataCases, charId) {
  //   this.canvas = document.getElementById('myChart');
  //   this.ctx = this.canvas.getContext('2d');
  //   let chart = new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //       labels: labels,
  //       data: this.dataCases,
  //       backgroundColor: '#ffffff',
  //       fill: false,
  //       borderWidth: 2,
  //     },
  //     title: {
  //       display: true,
  //       text: 'First chart',
  //     },
  //     tooltips: {
  //       mode: 'index',
  //       intersect: true,
  //     },
  //     options: {},
  //     hover: {
  //       mode: 'nearest',
  //       intersect: true,
  //     },
  //   });
}
