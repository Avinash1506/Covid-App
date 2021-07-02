import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
@Component({
  selector: 'app-updatedata',
  templateUrl: './updatedata.component.html',
  styleUrls: ['./updatedata.component.css'],
})
export class UpdatedataComponent implements OnInit {
  //implements OnInit
  constructor(private as: AdminserviceService) {}
  flag = false;
  covaxin_cost;
  covishield_cost;
  sputnikv_cost;
  data = [];
  sessions = [];
  dose1_capacity_sputnikv_45plus_0_fromdb;
  dose1_capacity_sputnikv_45plus_1_fromdb;
  dose1_capacity_sputnikv_45plus_2_fromdb;
  dose1_capacity_sputnikv_45plus_3_fromdb;
  dose1_capacity_sputnikv_45plus_4_fromdb;
  dose1_capacity_sputnikv_45plus_5_fromdb;
  dose1_capacity_sputnikv_45plus_6_fromdb;

  dose1_capacity_covaxin_18plus;
  dose2_capacity_covaxin_18plus;
  dose1_capacity_covaxin_45plus;
  dose2_capacity_covaxin_45plus;

  dose1_capacity_covishield_18plus;
  dose2_capacity_covishield_18plus;
  dose1_capacity_covishield_45plus;
  dose2_capacity_covishield_45plus;

  dose1_capacity_sputnikv_18plus;
  dose2_capacity_sputnikv_18plus;
  dose1_capacity_sputnikv_45plus;
  dose2_capacity_sputnikv_45plus;

  slots1;
  slots2;
  slots3;
  slots4;
  slots5;
  slots6;
  slots7;
  //eval:

  dose1_capacity_covaxin_18plus_;
  dose2_capacity_covaxin_18plus_;
  dose1_capacity_covaxin_45plus_;
  dose2_capacity_covaxin_45plus_;

  dose1_capacity_covishield_18plus_;
  dose2_capacity_covishield_18plus_;
  dose1_capacity_covishield_45plus_;
  dose2_capacity_covishield_45plus_;

  dose1_capacity_sputnikv_18plus_;
  dose2_capacity_sputnikv_18plus_;
  dose1_capacity_sputnikv_45plus_;
  dose2_capacity_sputnikv_45plus_;

  dose1_capacity_covaxin_18plus_1;
  dose2_capacity_covaxin_18plus_1;
  dose1_capacity_covaxin_45plus_1;
  dose2_capacity_covaxin_45plus_1;

  dose1_capacity_covishield_18plus_1;
  dose2_capacity_covishield_18plus_1;
  dose1_capacity_covishield_45plus_1;
  dose2_capacity_covishield_45plus_1;

  dose1_capacity_sputnikv_18plus_1;
  dose2_capacity_sputnikv_18plus_1;
  dose1_capacity_sputnikv_45plus_1;
  dose2_capacity_sputnikv_45plus_1;

  // Day-2

  dose1_capacity_covaxin_18plus_2;
  dose2_capacity_covaxin_18plus_2;
  dose1_capacity_covaxin_45plus_2;
  dose2_capacity_covaxin_45plus_2;

  dose1_capacity_covishield_18plus_2;
  dose2_capacity_covishield_18plus_2;
  dose1_capacity_covishield_45plus_2;
  dose2_capacity_covishield_45plus_2;

  dose1_capacity_sputnikv_18plus_2;
  dose2_capacity_sputnikv_18plus_2;
  dose1_capacity_sputnikv_45plus_2;
  dose2_capacity_sputnikv_45plus_2;

  // Day-3

  dose1_capacity_covaxin_18plus_3;
  dose2_capacity_covaxin_18plus_3;
  dose1_capacity_covaxin_45plus_3;
  dose2_capacity_covaxin_45plus_3;

  dose1_capacity_covishield_18plus_3;
  dose2_capacity_covishield_18plus_3;
  dose1_capacity_covishield_45plus_3;
  dose2_capacity_covishield_45plus_3;

  dose1_capacity_sputnikv_18plus_3;
  dose2_capacity_sputnikv_18plus_3;
  dose1_capacity_sputnikv_45plus_3;
  dose2_capacity_sputnikv_45plus_3;

  // Day-4

  dose1_capacity_covaxin_18plus_4;
  dose2_capacity_covaxin_18plus_4;
  dose1_capacity_covaxin_45plus_4;
  dose2_capacity_covaxin_45plus_4;

  dose1_capacity_covishield_18plus_4;
  dose2_capacity_covishield_18plus_4;
  dose1_capacity_covishield_45plus_4;
  dose2_capacity_covishield_45plus_4;

  dose1_capacity_sputnikv_18plus_4;
  dose2_capacity_sputnikv_18plus_4;
  dose1_capacity_sputnikv_45plus_4;
  dose2_capacity_sputnikv_45plus_4;

  // Day-5

  dose1_capacity_covaxin_18plus_5;
  dose2_capacity_covaxin_18plus_5;
  dose1_capacity_covaxin_45plus_5;
  dose2_capacity_covaxin_45plus_5;

  dose1_capacity_covishield_18plus_5;
  dose2_capacity_covishield_18plus_5;
  dose1_capacity_covishield_45plus_5;
  dose2_capacity_covishield_45plus_5;

  dose1_capacity_sputnikv_18plus_5;
  dose2_capacity_sputnikv_18plus_5;
  dose1_capacity_sputnikv_45plus_5;
  dose2_capacity_sputnikv_45plus_5;

  // Day-6

  dose1_capacity_covaxin_18plus_6;
  dose2_capacity_covaxin_18plus_6;
  dose1_capacity_covaxin_45plus_6;
  dose2_capacity_covaxin_45plus_6;

  dose1_capacity_covishield_18plus_6;
  dose2_capacity_covishield_18plus_6;
  dose1_capacity_covishield_45plus_6;
  dose2_capacity_covishield_45plus_6;

  dose1_capacity_sputnikv_18plus_6;
  dose2_capacity_sputnikv_18plus_6;
  dose1_capacity_sputnikv_45plus_6;
  dose2_capacity_sputnikv_45plus_6;

  // Day-7

  dose1_capacity_covaxin_18plus_7;
  dose2_capacity_covaxin_18plus_7;
  dose1_capacity_covaxin_45plus_7;
  dose2_capacity_covaxin_45plus_7;

  dose1_capacity_covishield_18plus_7;
  dose2_capacity_covishield_18plus_7;
  dose1_capacity_covishield_45plus_7;
  dose2_capacity_covishield_45plus_7;

  dose1_capacity_sputnikv_18plus_7;
  dose2_capacity_sputnikv_18plus_7;
  dose1_capacity_sputnikv_45plus_7;
  dose2_capacity_sputnikv_45plus_7;

  date1;
  date2;
  date3;
  date4;
  date5;
  date6;
  date7;

  data11 = '10';

  state_name: string;
  ngOnInit() {}
  getCenterId(data) {
    this.flag = true;
    this.as.getDataBasedOnCenterId(data).subscribe((data) => {
      console.log(data);
      this.data = data['message'];
      this.covaxin_cost = this.data['vaccine_costs'][0]['cost'];
      this.covishield_cost = this.data['vaccine_costs'][1]['cost'];
      this.sputnikv_cost = this.data['vaccine_costs'][2]['cost'];

      this.dose1_capacity_covaxin_18plus =
        this.data['vaccine_costs'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus =
        this.data['vaccine_costs'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus =
        this.data['vaccine_costs'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus =
        this.data['vaccine_costs'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus =
        this.data['vaccine_costs'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus =
        this.data['vaccine_costs'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus =
        this.data['vaccine_costs'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus =
        this.data['vaccine_costs'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus =
        this.data['vaccine_costs'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus =
        this.data['vaccine_costs'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus =
        this.data['vaccine_costs'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus =
        this.data['vaccine_costs'][2]['dose2_capacity_45plus'];

      this.sessions = this.data['sessions'];
      this.date1 = this.sessions[0]['date'];
      this.date2 = this.sessions[1]['date'];
      this.date3 = this.sessions[2]['date'];
      this.date4 = this.sessions[3]['date'];
      this.date5 = this.sessions[4]['date'];
      this.date6 = this.sessions[5]['date'];
      this.date7 = this.sessions[6]['date'];

      // Day-1
      this.dose1_capacity_covaxin_18plus_1 =
        this.sessions[0]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_1 =
        this.sessions[0]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_1 =
        this.sessions[0]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_1 =
        this.sessions[0]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_1 =
        this.sessions[0]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_1 =
        this.sessions[0]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_1 =
        this.sessions[0]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_1 =
        this.sessions[0]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_1 =
        this.sessions[0]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_1 =
        this.sessions[0]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_1 =
        this.sessions[0]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_1 =
        this.sessions[0]['vaccine'][2]['dose2_capacity_45plus'];

      // Day-2
      this.dose1_capacity_covaxin_18plus_2 =
        this.sessions[1]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_2 =
        this.sessions[1]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_2 =
        this.sessions[1]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_2 =
        this.sessions[1]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_2 =
        this.sessions[1]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_2 =
        this.sessions[1]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_2 =
        this.sessions[1]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_2 =
        this.sessions[1]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_2 =
        this.sessions[1]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_2 =
        this.sessions[1]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_2 =
        this.sessions[1]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_2 =
        this.sessions[1]['vaccine'][2]['dose2_capacity_45plus'];

      // Day-3
      this.dose1_capacity_covaxin_18plus_3 =
        this.sessions[2]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_3 =
        this.sessions[2]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_3 =
        this.sessions[2]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_3 =
        this.sessions[2]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_3 =
        this.sessions[2]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_3 =
        this.sessions[2]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_3 =
        this.sessions[2]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_3 =
        this.sessions[2]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_3 =
        this.sessions[2]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_3 =
        this.sessions[2]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_3 =
        this.sessions[2]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_3 =
        this.sessions[2]['vaccine'][2]['dose2_capacity_45plus'];

      // Day-4
      this.dose1_capacity_covaxin_18plus_4 =
        this.sessions[3]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_4 =
        this.sessions[3]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_4 =
        this.sessions[3]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_4 =
        this.sessions[3]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_4 =
        this.sessions[3]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_4 =
        this.sessions[3]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_4 =
        this.sessions[3]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_4 =
        this.sessions[3]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_4 =
        this.sessions[3]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_4 =
        this.sessions[3]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_4 =
        this.sessions[3]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_4 =
        this.sessions[3]['vaccine'][2]['dose2_capacity_45plus'];

      // Day-5
      this.dose1_capacity_covaxin_18plus_5 =
        this.sessions[4]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_5 =
        this.sessions[4]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_5 =
        this.sessions[4]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_5 =
        this.sessions[4]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_5 =
        this.sessions[4]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_5 =
        this.sessions[4]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_5 =
        this.sessions[4]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_5 =
        this.sessions[4]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_5 =
        this.sessions[4]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_5 =
        this.sessions[4]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_5 =
        this.sessions[4]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_5 =
        this.sessions[4]['vaccine'][2]['dose2_capacity_45plus'];

      // Day-6
      this.dose1_capacity_covaxin_18plus_6 =
        this.sessions[5]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_6 =
        this.sessions[5]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_6 =
        this.sessions[5]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_6 =
        this.sessions[5]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_6 =
        this.sessions[5]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_6 =
        this.sessions[5]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_6 =
        this.sessions[5]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_6 =
        this.sessions[5]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_6 =
        this.sessions[5]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_6 =
        this.sessions[5]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_6 =
        this.sessions[5]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_6 =
        this.sessions[5]['vaccine'][2]['dose2_capacity_45plus'];

      // Day-7
      this.dose1_capacity_covaxin_18plus_7 =
        this.sessions[6]['vaccine'][0]['dose1_capacity_18plus'];
      this.dose2_capacity_covaxin_18plus_7 =
        this.sessions[6]['vaccine'][0]['dose2_capacity_18plus'];
      this.dose1_capacity_covaxin_45plus_7 =
        this.sessions[6]['vaccine'][0]['dose1_capacity_45plus'];
      this.dose2_capacity_covaxin_45plus_7 =
        this.sessions[6]['vaccine'][0]['dose2_capacity_45plus'];

      this.dose1_capacity_covishield_18plus_7 =
        this.sessions[6]['vaccine'][1]['dose1_capacity_18plus'];
      this.dose2_capacity_covishield_18plus_7 =
        this.sessions[6]['vaccine'][1]['dose2_capacity_18plus'];
      this.dose1_capacity_covishield_45plus_7 =
        this.sessions[6]['vaccine'][1]['dose1_capacity_45plus'];
      this.dose2_capacity_covishield_45plus_7 =
        this.sessions[6]['vaccine'][1]['dose2_capacity_45plus'];

      this.dose1_capacity_sputnikv_18plus_7 =
        this.sessions[6]['vaccine'][2]['dose1_capacity_18plus'];
      this.dose2_capacity_sputnikv_18plus_7 =
        this.sessions[6]['vaccine'][2]['dose2_capacity_18plus'];
      this.dose1_capacity_sputnikv_45plus_7 =
        this.sessions[6]['vaccine'][2]['dose1_capacity_45plus'];
      this.dose2_capacity_sputnikv_45plus_7 =
        this.sessions[6]['vaccine'][2]['dose2_capacity_45plus'];

      let govt = <HTMLInputElement>document.querySelector('#govt1');
      let priv = <HTMLInputElement>document.querySelector('#govt2');
      if (data['hospital'] == 'private') {
        govt.checked = true;
      } else {
        priv.checked = true;
      }
      console.log(this.data['vaccine_costs']);
      let slots = '';
      for (let i = 0; i < this.data['sessions'].length; i++) {
        slots = '';
        for (let val of this.data['sessions'][i]['slots']) {
          if (slots != '') slots = slots + ',' + val;
          else slots = val;
        }
        this.data['sessions'][i]['slots_combined'] = slots;
        console.log(this.data['sessions'][i]['slots_combined']);
      }
      this.slots1 = this.sessions[0]['slots_combined'];
      this.slots2 = this.sessions[1]['slots_combined'];
      this.slots3 = this.sessions[2]['slots_combined'];
      this.slots4 = this.sessions[3]['slots_combined'];
      this.slots5 = this.sessions[4]['slots_combined'];
      this.slots6 = this.sessions[5]['slots_combined'];
      this.slots7 = this.sessions[6]['slots_combined'];

      this.as.getStatename().subscribe((dataOfStates) => {
        console.log('State data ', dataOfStates);
        let statesArray = dataOfStates['message']['states'];
        console.log(statesArray);
        for (let val of statesArray) {
          if (val['state_id'] == this.data['state']) {
            this.state_name = val['state_name'];
            break;
          }
        }
        console.log(this.state_name);
      });
    });
  }

  //

  updateData(data) {
    console.log(data);
    // for (let val in data) {
    // }
    // if (data['fee'] !== '') this.data['vaccine_cost']['cost'] = data['fee'];
    // if (data['vaccine'] !== '')
    //   this.data['vaccine_cost']['vaccine'] = data['vaccine'];
    // for (let i = 0; i < this.data['sessions'].length; i++) {
    //   if (data[`dose1${i + 1}_name`] !== '') {
    //     this.data['sessions'][i]['dose1_capacity'] = data[`dose1${i + 1}_name`];
    //   }
    //   if (data[`dose2${i + 1}_name`] !== '') {
    //     this.data['sessions'][i]['dose2_capacity'] = data[`dose2${i + 1}_name`];
    //   }
    //   if (data['vaccine'] !== '') {
    //     this.data['sessions'][i]['vaccine'] = data['vaccine'];
    //   }
    //   if (data[`slots${i + 1}_name`] !== '') {
    //     let str = data[`slots${i + 1}_name`],
    //       str1 = '';
    //     let arr = [];
    //     for (let i = 0; i < str.length; i++) {
    //       if (str[i] == ',') {
    //         arr.push(str1);
    //         str1 = '';
    //       } else {
    //         str1 += str[i];
    //       }
    //     }
    //     arr.push(str1);
    //     this.data['sessions'][i]['slots'] = arr;
    //     this.data['sessions'][i]['slots_combined'] = str;
    //   }
    //   if (data[`45+${i + 1}`] === '' && data[`18+${i + 1}`] === '') {
    //     continue;
    //   }
    //   if (data[`45+${i + 1}`] !== '') {
    //     if (data[`45+${i + 1}`] === true) {
    //       this.data['sessions'][i]['age'].push(45);
    //     } else {
    //       this.data['sessions'][i]['age'] = [18];
    //     }
    //   }
    //   if (data[`18+${i + 1}`] !== '') {
    //     if (data[`18+${i + 1}`] === true) {
    //       this.data['sessions'][i]['age'].push(18);
    //     } else {
    //       this.data['sessions'][i]['age'] = [45];
    //     }
    //   }
    // }
    // console.log(this.data);
    // this.as.updateData(this.data).subscribe((dataFromServer) => {
    //   if (dataFromServer['message'] === 'failure') {
    //     alert("Center doesn't exist");
    //   } else {
    //     alert('Successfully updated');
    //     window.location.reload();
    //   }
    // });
    let updatedData = this.data;

    //sessions[0]
    let vaccine_obj1 = this.data['sessions'][0]['vaccine'];
    let covaxin = 0,
      covishield = 0,
      sputnikv = 0;

    // Total vaccine capacity
    if (data['dose1_capacity_covaxin_18+'] != '') {
      updatedData['vaccine_costs'][0]['dose1_capacity_18plus'] =
        +data['dose1_capacity_covaxin_18+'];
    }
    if (data['dose2_capacity_covaxin_18+'] != '') {
      updatedData['vaccine_costs'][0]['dose2_capacity_18plus'] =
        +data['dose2_capacity_covaxin_18+'];
    }
    if (data['dose1_capacity_covaxin_45+'] != '') {
      updatedData['vaccine_costs'][0]['dose1_capacity_45plus'] =
        +data['dose1_capacity_covaxin_45+'];
    }
    if (data['dose2_capacity_covaxin_45+'] != '') {
      updatedData['vaccine_costs'][0]['dose2_capacity_45plus'] =
        +data['dose2_capacity_covaxin_45+'];
    }

    if (data['dose1_capacity_covishield_18+'] != '') {
      updatedData['vaccine_costs'][1]['dose1_capacity_18plus'] =
        +data['dose1_capacity_covishield_18+'];
    }
    if (data['dose2_capacity_covishield_18+'] != '') {
      updatedData['vaccine_costs'][1]['dose2_capacity_18plus'] =
        +data['dose2_capacity_covishield_18+'];
    }
    if (data['dose1_capacity_covishield_45+'] != '') {
      updatedData['vaccine_costs'][1]['dose1_capacity_45plus'] =
        +data['dose1_capacity_covishield_45+'];
    }
    if (data['dose2_capacity_covishield_45+'] != '') {
      updatedData['vaccine_costs'][1]['dose2_capacity_45plus'] =
        +data['dose2_capacity_covishield_45+'];
    }

    if (data['dose1_capacity_sputnikv_18+'] != '') {
      updatedData['vaccine_costs'][2]['dose1_capacity_18plus'] =
        +data['dose1_capacity_sputnikv_18+'];
    }
    if (data['dose2_capacity_sputnikv_18+'] != '') {
      updatedData['vaccine_costs'][2]['dose2_capacity_18plus'] =
        +data['dose2_capacity_sputnikv_18+'];
    }
    if (data['dose1_capacity_sputnikv_45+'] != '') {
      updatedData['vaccine_costs'][2]['dose1_capacity_45plus'] =
        +data['dose1_capacity_sputnikv_45+'];
    }
    if (data['dose2_capacity_sputnikv_45+'] != '') {
      updatedData['vaccine_costs'][2]['dose2_capacity_45plus'] =
        +data['dose2_capacity_sputnikv_45+'];
    }

    // for (let j = 1; j <= 7; j++) {
    //   for (
    //     let i = 0;
    //     i < updatedData['sessions'][j - 1]['vaccine'].length;
    //     i++
    //   ) {
    //     if (
    //       updatedData['sessions'][j - 1]['vaccine'][i]['vaccine'] == 'Covaxin'
    //     ) {
    //       if (data[`dose1_capacity_covaxin_18+_${j}`] != '') {
    //         updatedData['sessions'][j - 1]['vaccine'][i]['dose1_capacity'] =
    //           +data[`dose1_capacity_covaxin${j}`];
    //       }
    //       if (data[`dose2_capacity_covaxin${j}`] != '') {
    //         updatedData['sessions'][j - 1]['vaccine'][i]['dose2_capacity'] =
    //           +data[`dose2_capacity_covaxin${j}`];
    //       }
    //     }
    //     if (
    //       updatedData['sessions'][j - 1]['vaccine'][i]['vaccine'] ==
    //       'Covishield'
    //     ) {
    //       if (data[`dose1_capacity_covishield${j}`] != '') {
    //         updatedData['sessions'][j - 1]['vaccine'][i]['dose1_capacity'] =
    //           +data[`dose1_capacity_covishield${j}`];
    //       }
    //       if (data[`dose2_capacity_covishield${j}`] != '') {
    //         updatedData['sessions'][j - 1]['vaccine'][i]['dose2_capacity'] =
    //           +data[`dose2_capacity_covishield${j}`];
    //       }
    //     }
    //     if (
    //       updatedData['sessions'][j - 1]['vaccine'][i]['vaccine'] == 'Sputnik V'
    //     ) {
    //       if (data[`dose1_capacity_sputnikv${j}`] != '') {
    //         updatedData['sessions'][j - 1]['vaccine'][i]['dose1_capacity'] =
    //           +data[`dose1_capacity_sputnikv${j}`];
    //       }
    //       if (data[`dose2_capacity_sputnikv${j}`] != '') {
    //         updatedData['sessions'][j - 1]['vaccine'][i]['dose2_capacity'] =
    //           +data[`dose2_capacity_sputnikv${j}`];
    //       }
    //     }
    //   }
    // }

    // Updating capacity of all 7 dates

    for (let i = 1; i <= 7; i++) {
      for (
        let j = 0;
        j < updatedData['sessions'][i - 1]['vaccine'].length;
        j++
      ) {
        if (j == 0) {
          if (data[`dose1_capacity_covaxin_18+_${i}`] != '') {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose1_capacity_18plus'
            ] = +data[`dose1_capacity_covaxin_18+_${i}`];
          }
          if (data[`dose2_capacity_covaxin_18+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose2_capacity_18plus'
            ] = +data[`dose2_capacity_covaxin_18+_${i}`];
          }
          if (data[`dose1_capacity_covaxin_45+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose1_capacity_45plus'
            ] = +data[`dose1_capacity_covaxin_45+_${i}`];
          }
          if (data[`dose2_capacity_covaxin_45+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose2_capacity_45plus'
            ] = +data[`dose2_capacity_covaxin_45+_${i}`];
          }
        } else if (j == 1) {
          if (data[`dose1_capacity_covishield_18+_${i}`] != '') {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose1_capacity_18plus'
            ] = +data[`dose1_capacity_covishield_18+_${i}`];
          }
          if (data[`dose2_capacity_covishield_18+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose2_capacity_18plus'
            ] = +data[`dose2_capacity_covishield_18+_${i}`];
          }
          if (data[`dose1_capacity_covishield_45+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose1_capacity_45plus'
            ] = +data[`dose1_capacity_covishield_45+_${i}`];
          }
          if (data[`dose2_capacity_covishield_45+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose2_capacity_45plus'
            ] = +data[`dose2_capacity_covishield_45+_${i}`];
          }
        } else if (j == 2) {
          if (data[`dose1_capacity_sputnikv_18+_${i}`] != '') {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose1_capacity_18plus'
            ] = +data[`dose1_capacity_sputnikv_18+_${i}`];
          }
          if (data[`dose2_capacity_sputnikv_18+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose2_capacity_18plus'
            ] = +data[`dose2_capacity_sputnikv_18+_${i}`];
          }
          if (data[`dose1_capacity_sputnikv_45+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose1_capacity_45plus'
            ] = +data[`dose1_capacity_sputnikv_45+_${i}`];
          }
          if (data[`dose2_capacity_sputnikv_45+_${i}`]) {
            updatedData['sessions'][i - 1]['vaccine'][j][
              'dose2_capacity_45plus'
            ] = +data[`dose2_capacity_sputnikv_45+_${i}`];
          }
        }
      }
    }

    //updating slots of all days;
    for (let j = 1; j <= 7; j++) {
      delete updatedData['sessions'][j - 1]['slots_combined'];
      if (data[`slots${j}_name`] != '') {
        let slots = data[`slots${j}_name`];
        let str = '';
        let arr = [];
        for (let i = 0; i < slots.length; i++) {
          if (slots[i] == ',') {
            arr.push(str);
            str = '';
          } else {
            str += slots[i];
          }
        }
        // console.log(str);
        arr.push(str);
        updatedData['sessions'][j - 1]['slots'] = arr;
      }
    }
    delete updatedData['_id'];
    console.log(updatedData);

    this.as.updateData(updatedData).subscribe((dataFromServer) => {
      if (dataFromServer['message'] === 'failure') {
        alert("Center doesn't exist");
      } else {
        alert('Successfully updated');
        // window.location.reload();
      }
    });
  }
}
