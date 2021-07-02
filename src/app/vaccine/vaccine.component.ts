import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../data.service';
import { faSyringe } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { DecimalPipe } from '@angular/common';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
})
export class VaccineComponent implements OnInit {
  faSyringe = faSyringe;
  faChartBar = faChartBar;
  constructor(
    private dp: DecimalPipe,
    private ds: DataService,
    private appObj: AppComponent
  ) {}
  //Chart.defaults.global.legend.display = false;
  greaterThan45FirstDose;
  greaterThan45SecondDose;
  greaterThan60FirstDose;
  greaterThan60SecondDose;
  frontlineworkersFirstDose;
  frontlineworkersSecondDose;
  healthlineworkersFirstDose;
  healthlineworkersSecondDose;
  vaccineArray;
  ngOnInit(): void {
    //calling underline function in app component so that the link is navbar is underlined when this component is opened
    this.appObj.underline('vaccine');
    this.ds.data1().subscribe((data) => {
      //Data for table

      this.vaccineArray = data['tested'];
      let i;
      for (i = this.vaccineArray.length - 1; i--; i >= 0) {
        if (this.vaccineArray[i]['over45years1stdose'] != '') {
          break;
        }
      }
      console.log(this.vaccineArray[i]['over45years1stdose']);
      this.greaterThan45FirstDose = this.vaccineArray[i]['over45years1stdose']; //this.dp.transform(
      //   500000.9
      // );
      this.greaterThan45SecondDose = this.vaccineArray[i]['over45years2nddose'];
      this.greaterThan60FirstDose = this.vaccineArray[i]['over60years1stdose'];
      this.greaterThan60SecondDose = this.vaccineArray[i]['over60years2nddose'];
      this.frontlineworkersFirstDose =
        this.vaccineArray[i]['frontlineworkersvaccinated1stdose'];
      this.frontlineworkersSecondDose =
        this.vaccineArray[i]['frontlineworkersvaccinated2nddose'];
      this.healthlineworkersFirstDose =
        this.vaccineArray[i]['healthcareworkersvaccinated1stdose'];
      this.healthlineworkersSecondDose =
        this.vaccineArray[i]['healthcareworkersvaccinated2nddose'];
      // Bar chart
      let labels = [];
      let details = [];
      labels.push('>60 1st Dose');
      labels.push('>60 2nd Dose');
      labels.push('>45 1st Dose');
      labels.push('>45 2nd Dose');
      labels.push('Frontline workers 1st Dose');
      labels.push('Frontline workers 2nd Dose');
      labels.push('Healthscare Workers 1st Dose');
      labels.push('Healthscare Workers 2nd Dose');
      details.push(this.greaterThan60FirstDose);
      details.push(this.greaterThan60SecondDose);
      details.push(this.greaterThan45FirstDose);
      details.push(this.greaterThan45SecondDose);
      details.push(this.frontlineworkersFirstDose);
      details.push(this.frontlineworkersSecondDose);
      details.push(this.healthlineworkersFirstDose);
      details.push(this.healthlineworkersSecondDose);
      const canvas = <HTMLCanvasElement>document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              // label: 'Vaccination details',
              data: details,
              backgroundColor: [
                'rgba(248, 138, 138, 1)',
                'rgba(148, 230, 239, 1)',
                'rgba(148, 230, 138, 1)',
                'rgba(242, 26, 54, 1)',
                'rgba(148, 150, 239, 1)',
                'rgba(180, 68, 188, 1)',
                'rgba(49, 255, 58, 1)',
                'rgba(242, 255, 178, 1)',
              ],
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
              ],
            },
          ],
        },
        //for removing the label
        options: {
          legend: {
            display: false,
          },
        },
      });
    });
  }
}
