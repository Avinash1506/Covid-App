import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { VaccineserviceService } from '../vaccineservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private vss: VaccineserviceService,
    private appObj: AppComponent,
    private router: Router
  ) {}
  userData;
  email: string;
  fname: string;
  lname: string;
  name: string;
  mnumber: number;
  firstdose: object;
  seconddose: object;
  fdate;
  fvaccine: string;
  fslot: string;
  fcenterName: string;
  fstateName: string;
  fdistrictName: string;
  sdate;
  svaccine: string;
  sslot: string;
  scenterName: string;
  sstateName: string;
  sdistrictName: string;
  firstDoseExistance: boolean;
  secondDoseExistance: boolean;
  noOfDays: number;
  mainfdate: string = '';
  username: string = '';
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('Userdata'));
    console.log(this.username);
    // this.email = this.userData['email'];
    // this.fname = this.userData['firstname'];
    // this.lname = this.userData['lastname'];
    // this.mnumber = this.userData['mobilenumber'];
    // this.name = this.fname + ' ' + this.lname;
    this.vss.getUserDetails(this.username).subscribe((data) => {
      if (data['message'] === 'Unauthorized access') {
        let val = <HTMLElement>document.querySelector('#bt');
        val.click();
      }
      this.appObj.underline('dashboard');
      this.email = data['message']['email'];
      // console.log(data['message']);
      this.fname = data['message']['firstname'];
      this.lname = data['message']['lastname'];
      this.mnumber = data['message']['mobilenumber'];
      this.name = this.fname + ' ' + this.lname;
    });
    this.vss.getVaccineDetails(this.username).subscribe((data) => {
      this.firstdose = data['firstdose'];
      this.seconddose = data['seconddose'];
      this.fdate = this.firstdose['date'];
      this.fvaccine = this.firstdose['vaccine'];
      this.fslot = this.firstdose['slot'];
      this.fcenterName = this.firstdose['center'];
      this.fdistrictName = this.firstdose['district'];
      this.fstateName = this.firstdose['state'];
      this.sdate = this.seconddose['date'];
      this.svaccine = this.seconddose['vaccine'];
      this.sslot = this.seconddose['slot'];
      this.scenterName = this.seconddose['center'];
      this.sdistrictName = this.seconddose['district'];
      this.sstateName = this.seconddose['state'];
      // console.log('First dose is: ', this.firstdose);
      if (
        Object.keys(this.firstdose).length === 0 &&
        this.firstdose.constructor === Object
      ) {
        this.firstDoseExistance = false;
        // console.log('Hello in dashboard');
      } else {
        this.firstDoseExistance = true;
      }
      if (
        Object.keys(this.seconddose).length === 0 &&
        this.seconddose.constructor === Object
      ) {
        this.secondDoseExistance = false;
        if (this.firstDoseExistance) {
          let date = new Date();
          this.mainfdate += this.fdate[3];
          this.mainfdate += this.fdate[4];
          this.mainfdate += '/';
          this.mainfdate += this.fdate[0];
          this.mainfdate += this.fdate[1];
          this.mainfdate += '/';
          this.mainfdate += this.fdate[6];
          this.mainfdate += this.fdate[7];
          this.mainfdate += this.fdate[8];
          this.mainfdate += this.fdate[9];
          // console.log(this.mainfdate);
          let secondDoseDate = '';
          secondDoseDate += date.getMonth() + 1;
          secondDoseDate += '/';
          secondDoseDate += date.getDate();
          secondDoseDate += '/';
          secondDoseDate += date.getFullYear();
          let firstDoseDate = new Date(this.mainfdate);
          let secondDoseDateMain = new Date(secondDoseDate);
          let secondDoseTime = secondDoseDateMain.getTime();
          let firstDoseTime = firstDoseDate.getTime();
          let diff = secondDoseTime - firstDoseTime;
          // console.log(firstDoseDate);
          // console.log(date);
          // console.log('Difference is: ', firstDoseTime);
          // console.log('Difference is: ', secondDoseTime);
          // console.log('Difference is: ', diff);
          this.noOfDays = 28 - diff / (60 * 60 * 24 * 1000);
        }
      } else {
        this.secondDoseExistance = true;
      }
    });
  }
  navigateToLogin() {
    this.router.navigate(['./login']);
  }
}
