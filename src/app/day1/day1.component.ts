import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaccineserviceService } from '../vaccineservice.service';

@Component({
  selector: 'app-day1',
  templateUrl: './day1.component.html',
  styleUrls: ['./day1.component.css'],
})
export class Day1Component implements OnInit {
  state_no;
  district_no;
  detailsOfDay1 = [];
  day1Obj = {};
  displayCovaxin = true;
  displayCovaxinDose1 = true;
  displayCovaxinDose2 = true;
  displayCovishield = true;
  displayCovishieldDose1 = true;
  displayCovishieldDose2 = true;
  displaySputnikv = true;
  displaySputnikvDose1 = true;
  displaySputnikvDose2 = true;
  day1ObjArray = [];
  constructor(
    private vss: VaccineserviceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.state_no = JSON.parse(sessionStorage.getItem('stateNoForSlotbooking'));
    this.district_no = JSON.parse(
      sessionStorage.getItem('districtNoForSlotbooking')
    );
    // this.router.queryParams.subscribe((data)=>{
    //   this.state_no=data['state'];
    //   this.district_no=data['district'];
    // })
    console.log(this.state_no);
    console.log('Hello');
    console.log(this.state_no);
    console.log(this.district_no);

    this.vss
      .getDataByDistrictAndStateIdId(this.district_no, this.state_no)
      .subscribe(async (data) => {
        console.log(data['centerDetails']);
        for (let val of data['centerDetails']) {
          let day1Obj = {};
          day1Obj['center_name'] = val['centername'];
          day1Obj['center_address'] = val['centeraddress'];
          day1Obj['district_name'] = val['district'];
          day1Obj['state_name'] = await this.findState(val['state']);
          day1Obj['center_id'] = val['center_id'];
          day1Obj['pincode'] = val['pincode'];
          day1Obj['hospital'] = val['hospital'];
          day1Obj['date'] = val['sessions'][0]['date'];
          // for(let i=0;i<val['sessions'][0]['vaccine'].length;i++){
          //   if(val['sessions'][0]['vaccine'][i]['vaccine']=='Covaxin'){
          //     for(let val1 of val['vaccine_costs']){
          //       if(val1["vaccine"]=="Covaxin"){
          //         val['sessions'][0]['vaccine'][i]['vaccine_cost']=val1['cost'];
          //       }
          //     }
          //   }
          //   else if(val['sessions'][0]['vaccine'][i]['vaccine']=='Covishield'){
          //     for(let val1 of val['vaccine_costs']){
          //       if(val1["vaccine"]=="Covishield"){
          //         val['sessions'][0]['vaccine'][i]['vaccine_cost']=val1['cost'];
          //       }
          //     }
          //   }
          //   else if(val['sessions'][0]['vaccine'][i]['vaccine']=='Sputnik V'){
          //     for(let val1 of val['vaccine_costs']){
          //       if(val1["vaccine"]=="Sputnik V"){
          //         val['sessions'][0]['vaccine'][i]['vaccine_cost']=val1['cost'];
          //       }
          //     }
          //   }
          // }
          // day1Obj['vaccine']=val['sessions'][0]['vaccine'];
          day1Obj['covaxin'] = val['sessions'][0]['vaccine'][0];
          day1Obj['covishield'] = val['sessions'][0]['vaccine'][1];
          day1Obj['sputnikv'] = val['sessions'][0]['vaccine'][2];
          this.day1ObjArray.push(day1Obj);
          console.log(day1Obj);
          if (
            val['sessions'][0]['vaccine'][0]['dose1_capacity_18plus'] == 0 &&
            val['sessions'][0]['vaccine'][0]['dose1_capacity_45plus'] == 0
          ) {
            this.displayCovaxinDose1 = false;
          }
          if (
            val['sessions'][0]['vaccine'][0]['dose2_capacity_18plus'] == 0 &&
            val['sessions'][0]['vaccine'][0]['dose2_capacity_45plus'] == 0
          ) {
            this.displayCovaxinDose2 = false;
          }
          if (
            this.displayCovaxinDose1 == false &&
            this.displayCovaxinDose2 == false
          ) {
            this.displayCovaxin = false;
          }

          if (
            val['sessions'][0]['vaccine'][0]['dose1_capacity_18plus'] == 0 &&
            val['sessions'][0]['vaccine'][0]['dose1_capacity_45plus'] == 0
          ) {
            this.displayCovishieldDose1 = false;
          }
          if (
            val['sessions'][0]['vaccine'][0]['dose2_capacity_18plus'] == 0 &&
            val['sessions'][0]['vaccine'][0]['dose2_capacity_45plus'] == 0
          ) {
            this.displayCovishieldDose2 = false;
          }
          if (
            this.displayCovishieldDose1 == false &&
            this.displayCovishieldDose2 == false
          ) {
            this.displayCovishield = false;
          }

          if (
            val['sessions'][0]['vaccine'][0]['dose1_capacity_18plus'] == 0 &&
            val['sessions'][0]['vaccine'][0]['dose1_capacity_45plus'] == 0
          ) {
            this.displaySputnikvDose1 = false;
          }
          if (
            val['sessions'][0]['vaccine'][0]['dose2_capacity_18plus'] == 0 &&
            val['sessions'][0]['vaccine'][0]['dose2_capacity_45plus'] == 0
          ) {
            this.displaySputnikvDose2 = false;
          }
          if (
            this.displaySputnikvDose1 == false &&
            this.displaySputnikvDose2 == false
          ) {
            this.displaySputnikv = false;
          }
        }
        console.log(this.day1ObjArray);
      });
  }
  findState(state_no) {
    this.vss.getStates().subscribe((data) => {
      for (let val of data['message']) {
        if (val['state_id'] == state_no) {
          return val['state_name'];
        }
      }
    });
  }
  bookAVaccine(data) {}
  // displayData(){
  //   console.log("Hello");
  //   this.router.queryParams.subscribe((data)=>{
  //     this.state_no=data['state'];
  //     this.district_no=data['district'];
  //   })
  //   console.log(this.state_no);
  //   console.log('Hello');
  //   console.log(this.state_no);
  //   console.log(this.district_no);
  //   this.vss
  //     .getDataByDistrictAndStateIdId(this.district_no, this.state_no)
  //     .subscribe((data) => {
  //       console.log(data['centerDetails']);
  //       for (let val of data['centerDetails']) {
  //         let day1Obj = {};
  //         console.log(val);
  //         day1Obj['center_id'] = val['center_id'];
  //         day1Obj['centeraddress'] = val['centeraddress'];
  //         day1Obj['centername'] = val['centername'];
  //         day1Obj['district'] = val['district'];
  //         day1Obj['district_id'] = val['district_id'];
  //         day1Obj['hospital'] = val['hospital'];
  //         day1Obj['pincode'] = val['pincode'];
  //         day1Obj['age'] = val['sessions'][0]['age'];
  //         day1Obj['dose1_capacity'] = val['sessions'][0]['dose1_capacity'];
  //         day1Obj['dose2_capacity'] = val['sessions'][0]['dose2_capacity'];
  //         day1Obj['date'] = val['sessions'][0]['date'];
  //         day1Obj['slots'] = val['sessions'][0]['slots'];
  //         day1Obj['vaccine'] = val['vaccine_cost'];
  //         console.log(day1Obj);
  //         this.detailsOfDay1.push(day1Obj);
  //       }
  //       console.log(this.detailsOfDay1);
  //     });
  // }
}
