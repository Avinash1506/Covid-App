import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VaccineserviceService } from 'src/app/vaccineservice.service';
import { AdminserviceService } from '../adminservice.service';
@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.css'],
})
export class AdddataComponent implements OnInit {
  constructor(
    private vss: VaccineserviceService,
    private ass: AdminserviceService
  ) {}
  displaycovaxin18plus = true;
  displaycovaxin45plus = true;
  displaycovishield18plus = true;
  displaycovishield45plus = true;
  displaysputnikv18plus = true;
  displaysputnikv45plus = true;
  districtsArray = [];
  displaySputnikv = true;
  displayCovishield = true;
  displayCovaxin = true;
  isSelected = false;
  statesArray = [];
  ngOnInit() {
    this.vss.getStatesAdmin().subscribe((data) => {
      this.statesArray = data['message'];
    });
  }
  getState(state) {
    console.log(state.target.value);
    this.isSelected = true;
    let state_no = state.target.value;
    this.vss.getDistrictAdmin(state_no).subscribe((data) => {
      console.log(data);
      this.districtsArray = data['message'];
    });
  }
  async addData(formData) {
    let data = formData.value;
    let district_id = data['district_id'];
    console.log(district_id);
    console.log(data['state']);
    // let district = await this.getDistrict(district_id, data['state']);
    this.vss.getDistrictAdmin(data['state']).subscribe((dataFromDistricts) => {
      let districtsArray = dataFromDistricts['message'];
      console.log(districtsArray);
      for (let val of districtsArray) {
        if (val['district_id'] == district_id) {
          data['district'] = val['district_name'];
        }
      }
      console.log(data);
      console.log(data['district']);
      console.log(data['covaxin']);
      console.log(data['covaxin_cost']);
      let str = data['slots'];
      let strmain = '';
      let slotsArray = [];
      for (let i = 0; i < str.length; i++) {
        if (str[i] == ',') {
          slotsArray.push(strmain);
          strmain = '';
        } else {
          strmain += str[i];
        }
      }
      slotsArray.push(strmain);
      data['slots'] = slotsArray;
      console.log(data);
      this.ass.sendData(data).subscribe((data) => {
        console.log(data['message']);
        if (data['message'] == 'Already exists') {
          alert('Already exists');
        } else {
          alert('Success');
          //window.location.reload();
        }
      });
    });
  }
}
