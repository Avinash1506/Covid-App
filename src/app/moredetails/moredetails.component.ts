import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { VaccineserviceService } from '../vaccineservice.service';
@Component({
  selector: 'app-moredetails',
  templateUrl: './moredetails.component.html',
  // template: '<h3>Hospital name: {{hospitalName}}</h3>',
  styleUrls: ['./moredetails.component.css'],
})
export class MoredetailsComponent implements OnInit {
  constructor(
    private ds: DataService,
    private vss: VaccineserviceService,
    private router: Router
  ) {}
  district_no1: number;
  center_no: number;
  idx: number;
  hospitalName;
  stateName;
  districtName;
  availableCapacity;
  date;
  vaccine;
  isTrue = false;
  data;
  slots = [];
  ngOnInit(): void {
    this.data = this.vss.sendData();
    this.center_no = this.data['center_no'];
    console.log(this.data);
    // this.vss
    //   .getDataByDistrictId(this.data['district_no'])
    //   .subscribe((data1) => {
    //     console.log(data1);
    //     let i = 0;
    //     console.log('Data from api is ', data1);
    //     for (let val of data1['sessions']) {
    //       if (val['center_id'] == this.center_no) {
    //         this.idx = i;
    //         break;
    //       }
    //       i++;
    //     }
    //     this.hospitalName = data1['sessions'][this.idx]['name'];
    //     this.stateName = data1['sessions'][this.idx]['state_name'];
    //     this.districtName = data1['sessions'][this.idx]['district_name'];
    //     this.date = data1['sessions'][this.idx]['date'];
    //     this.vaccine = data1['sessions'][this.idx]['vaccine'];
    //     this.slots = data1['sessions'][this.idx]['slots'];
    //   });
    // this.vss.invokeMoreDetailsFunction.subscribe((data) => {
    //   // this.val = true; //true because user is logged in
    //   // this.toShow = true; // true because seach bar should be present
    //   this.ngZone.run(() => {
    //     console.log('name is ', data);
    //     this.district_no1 = +data['district_no'];
    //     console.log(this.district_no1);
    //     this.center_no = +data['center_no'];
    //     this.vss.getDataByDistrictId(this.district_no1).subscribe((data1) => {
    //       this.ngZone.run(() => {
    //         let i = 0;
    //         console.log('Data from api is ', data1);
    //         for (let val of data1['sessions']) {
    //           if (val['center_id'] == this.center_no) {
    //             this.idx = i;
    //             break;
    //           }
    //           i++;
    //         }

    //         this.hospitalName = data1['sessions'][this.idx]['name'];
    //         // this.testEmitter$.next(this.hospitalName);
    //       });
    //     });
    //     // this.makeTrue();
    //     // this.hospitalName = data1['sessions'][this.idx]['name'];

    //     // this.stateName = data1['sessions'][this.idx]['state_name'];
    //     // this.districtName = data1['sessions'][this.idx]['district_name'];
    //     // this.date = data1['sessions'][this.idx]['date'];
    //     // this.vaccine = data1['sessions'][this.idx]['vaccine'];
    //     // this.availableCapacity =
    //     //   data1['sessions'][this.idx]['available_capacity'];
    //     // this.slots = data1['sessions'][this.idx]['slots'];
    //     // this.filtersLoaded = Promise.resolve(true);
    //     // let hospitalname = <HTMLElement>(
    //     //   document.querySelector('.hospitalname')
    //     // );
    //     // hospitalname.innerHTML = this.hospitalName;
    //     // let statename = <HTMLElement>document.querySelector('.statename');
    //     // statename.innerHTML = this.stateName;
    //     // let districtname = <HTMLElement>(
    //     //   document.querySelector('.districtname')
    //     // );
    //     // districtname.innerHTML = this.districtName;
    //     // let vaccinename = <HTMLElement>document.querySelector('.vaccine');
    //     // vaccinename.innerHTML = this.vaccine;
    //     // let date = <HTMLElement>document.querySelector('.date');
    //     // date.innerHTML = this.date;
    //     // let slot = <HTMLElement>document.querySelector('.slot');
    //     //   // <div class="form-check">
    //     //   <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
    //     //   <label class="form-check-label" for="flexRadioDefault1">
    //     //     Default radio
    //     //   </label>
    //     // </div>
    //     // let j = 0;
    //     // for (let val of this.slots) {
    //     //   console.log(val);
    //     //   let ele = document.createElement('div');
    //     //   ele.className = 'form-check';
    //     //   let input = document.createElement('input');
    //     //   input.type = 'radio';
    //     //   input.name = 'flexRadioDefault';
    //     //   input.id = `flexRadioDefault${j}`;
    //     //   input.className = 'form-check-input';
    //     //   // input.ngModel

    //     //   let label = document.createElement('label');
    //     //   label.className = 'form-check-label';
    //     //   label.htmlFor = `flexRadioDefault${j}`;
    //     //   label.innerHTML = val;
    //     //   ele.append(input);
    //     //   ele.append(label);
    //     //   slot.append(ele);
    //     //   j++;
    //     // }

    //     console.log(this.slots);
    //     console.log(this.filtersLoaded);
    //     console.log(this.hospitalName);
    //   });
    // });
    console.log('Sate name is ', this.stateName);
    console.log(this.hospitalName);
    // }
    // console.log(this.district_no1);
  }
  makeTrue() {
    this.hospitalName = this.hospitalName;
    this.hospitalName = 'HEllo';
    console.log('Hospital name ', this.hospitalName);
  }
  redirectToSuccessPage(val) {
    this.vss.putSlot(val);
    this.vss.putDate(this.date);
    this.vss.putVaccine(this.vaccine);
    this.vss.putStateName(this.stateName);
    this.vss.putDistrictName(this.districtName);
    this.vss.putHospitalName(this.hospitalName);
    this.router.navigate(['./successpage']);
  }
}
