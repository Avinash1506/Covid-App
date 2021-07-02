import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day1Component } from '../day1/day1.component';
import { SlotbookingComponent } from '../slotbooking/slotbooking.component';
import { VaccineserviceService } from '../vaccineservice.service';
@Component({
  selector: 'app-searchbydistrict',
  templateUrl: './searchbydistrict.component.html',
  styleUrls: ['./searchbydistrict.component.css'],
})
export class SearchbydistrictComponent implements OnInit {
  constructor(
    private vss: VaccineserviceService,
    private router: Router,
    private slotbookingObj: SlotbookingComponent,
    private day1Obj: Day1Component
  ) {}
  pin;
  mainDetailsArray = [];
  statesArray;
  districtints;
  stateints;
  districtsArray;
  state_no;
  district_no;
  day;
  detailsArray;
  hospital_name = [];
  vaccine_name = [];
  date = [];
  isFilledState = false;
  isFilledDistrict = false;
  displayPagination;
  ngOnInit(): void {
    if (sessionStorage.getItem('stateNoForSlotbooking')) {
      this.displayPagination = true;
      this.districtints = sessionStorage.getItem('districtNoForSlotbooking');
      this.stateints = sessionStorage.getItem('stateNoForSlotbooking');
      this.router.navigate(['./selectcenter/bydistrict/day1']);
    }
    this.slotbookingObj.activate('district');
    this.vss.getStates().subscribe((data) => {
      this.statesArray = data['message'];
      console.log(this.statesArray);
    });
  }
  getState(data) {
    this.state_no = data.target.value;
    this.isFilledState = true;
    console.log(this.state_no);
    if (sessionStorage.getItem('stateNoForSlotbooking')) {
      sessionStorage.removeItem('stateNoForSlotbooking');
      sessionStorage.setItem('stateNoForSlotbooking', this.state_no);
    } else {
      sessionStorage.setItem('stateNoForSlotbooking', this.state_no);
    }
    this.vss.getDistrict(this.state_no).subscribe((data) => {
      this.districtsArray = data['districts'];
    });
  }
  getDistrict(data) {
    this.district_no = data.target.value;
    this.isFilledDistrict = true;
    if (sessionStorage.getItem('districtNoForSlotbooking')) {
      sessionStorage.removeItem('districtNoForSlotbooking');
      sessionStorage.setItem('districtNoForSlotbooking', this.district_no);
    } else {
      sessionStorage.setItem('districtNoForSlotbooking', this.district_no);
    }
  }
  navigateTo1() {
    this.displayPagination = true;
    // this.day1Obj.displayData();
    this.router.navigate(['/']).then(() => {
      this.router.navigate(
        ['./selectcenter/bydistrict/day1']
        // queryParams: { state: this.state_no, district: this.district_no },
      );
    });

    // this.day1Obj.displayData();
  }
  bookAVaccine(center_no) {
    // this.parentFunction.emit({
    //   state_no: this.state_no,
    //   district_no: this.district_no,
    //   center_no: center_no,
    // });
    // this.vss.sendingDataFromSlotBooking({
    //   state_no: this.state_no,
    //   district_no: this.district_no,
    //   center_no: center_no,
    // });
    this.vss.setData({
      state_no: this.state_no,
      district_no: this.district_no,
      center_no: center_no,
    });
  }
}
