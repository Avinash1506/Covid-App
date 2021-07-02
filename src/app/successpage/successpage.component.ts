import { Component, OnInit } from '@angular/core';
import { VaccineserviceService } from '../vaccineservice.service';
import { Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css'],
})
export class SuccesspageComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;
  constructor(private vss: VaccineserviceService, private router: Router) {}
  date;
  slot;
  data;
  district_no;
  center_no;
  vaccine;
  firstDose: boolean;
  secondDose: boolean;
  vaccinesNotSame: boolean;
  lessNoOfDays: boolean;
  firstDoseVaccine: string;
  remainingDays: number;
  hospitalName: string;
  districtName: string;
  stateName: string;
  ngOnInit(): void {
    this.date = this.vss.getDate();
    this.slot = this.vss.getSlot();
    this.data = this.vss.sendData();
    this.vaccine = this.vss.getVaccine();
    this.hospitalName = this.vss.getHospitalName();
    this.districtName = this.vss.getDistrictName();
    this.stateName = this.vss.getStateName();
    this.district_no = this.data['district_no'];
    this.center_no = this.data['center_no'];
    let username = JSON.parse(localStorage.getItem('Userdata'));
    // console.log('mobile no is ', userdata['mobilenumber']);
    // let username = username;
    let obj = {
      username: username,
      date: this.date,
      district_no: this.district_no,
      center_no: this.center_no,
      vaccine: this.vaccine,
      slot: this.slot,
      hospitalName: this.hospitalName,
      stateName: this.stateName,
      districtName: this.districtName,
    };

    // this.vss.getVaccineName(mobileNumber).subscribe((data) => {
    //   this.firstDoseVaccine = data['message'];
    // });
    this.vss.checkvaccinedetails(obj).subscribe((data) => {
      if (data['message'] == 'No Dose Taken') {
        // alert('First dose registration is successful');
        this.firstDose = true;
      } else if (data['message'] == 'first dose taken') {
        // alert('Second dose registration is successful');
        this.secondDose = true;
      } else if (data['message'] == 'Two doses are taken') {
        // alert('Both the doses are already taken');
        this.firstDose = true;
        this.secondDose = true;
      } else if (data['message'] == 'Vaccines are not same') {
        // alert('Vaccine taken during first dose is not same as this');
        this.vaccinesNotSame = true;
        this.firstDoseVaccine = data['vaccine'];
      } else if (data['message'] == 'less no of days') {
        // alert('You need to wait for 28 days before you take the second dose');
        this.lessNoOfDays = true;
        this.remainingDays = data['daysRemaining'];
      }
    });
  }
  navigateToCases() {
    this.router.navigate(['./cases']);
  }
}
