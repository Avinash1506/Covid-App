import { Component, OnInit } from '@angular/core';
import { VaccineserviceService } from '../vaccineservice.service';

@Component({
  selector: 'app-day2',
  templateUrl: './day2.component.html',
  styleUrls: ['./day2.component.css']
})
export class Day2Component implements OnInit {
  state_no;
  district_no;
  detailsOfDay2 = [];
  constructor(private vss:VaccineserviceService) { }

  ngOnInit(): void {
    this.state_no = sessionStorage.getItem('stateNoForSlotbooking');
    this.district_no = sessionStorage.getItem('districtNoForSlotbooking');
    console.log('Hello');
    console.log(this.state_no);
    console.log(this.district_no);
    this.vss
      .getDataByDistrictAndStateIdId(this.district_no, this.state_no)
      .subscribe((data) => {
        console.log(data['centerDetails']);
        for (let val of data['centerDetails']) {
          let day1Obj = {};
          console.log(val);
          day1Obj['center_id'] = val['center_id'];
          day1Obj['centeraddress'] = val['centeraddress'];
          day1Obj['centername'] = val['centername'];
          day1Obj['district'] = val['district'];
          day1Obj['district_id'] = val['district_id'];
          day1Obj['hospital'] = val['hospital'];
          day1Obj['pincode'] = val['pincode'];
          day1Obj['age'] = val['sessions'][1]['age'];
          day1Obj['dose1_capacity'] = val['sessions'][1]['dose1_capacity'];
          day1Obj['dose2_capacity'] = val['sessions'][1]['dose2_capacity'];
          day1Obj['date'] = val['sessions'][1]['date'];
          day1Obj['slots'] = val['sessions'][1]['slots'];
          day1Obj['vaccine_name'] = val['sessions'][1]['vaccine'];
          day1Obj['vaccine_cost'] = val['vaccine_cost']['cost'];
          console.log(day1Obj);
          this.detailsOfDay2.push(day1Obj);
        }
        console.log(this.detailsOfDay2);
      });
  }

}
