import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { VaccineserviceService } from '../vaccineservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css'],
})
export class CasesComponent implements OnInit {
  faSearch = faSearch;
  state = 'no state';
  displayTextBox;
  addUnderline(name) {
    let indiaLink = document.querySelector('.india');
    let worldLink = document.querySelector('.world');
    if (name == 'india') {
      indiaLink.classList.add('underline');
      worldLink.classList.remove('underline');
    } else {
      worldLink.classList.add('underline');
      indiaLink.classList.remove('underline');
    }
  }
  // @Output() parentFunction = new EventEmitter();
  // active;
  // total;
  // deaths;
  // recovered;
  // stateFromUser;
  // stateFromApi;
  // stateDetails;
  // flag = false;
  // districtDetails;
  // country;
  // districtDet;
  // timeseriesdata = [];
  // arr = [];
  // newConfirmed;
  // newDeceased;
  // newRecovered;
  // i;
  // stateName;
  // b: boolean = true;
  constructor(
    private ds: DataService,
    private vss: VaccineserviceService,
    private router: Router // private ar: ActivatedRoute, // private appObj: AppComponent;
  ) {}
  // stateOrCountry;
  // async takeToHome() {
  //   this.b = true;
  //   this.parentFunction.emit('Hello');
  //   console.log('Hello all');
  //   this.router.navigate(['./cases']);
  // }
  stateName(state) {
    console.log('In cases component');
    console.log('State name is ', state);
    //this.vss.setStateName(state['state']);
    //location.reload();
    if (sessionStorage.getItem('state')) {
      sessionStorage.removeItem('state');
    }
    sessionStorage.setItem('state', state['state']);
    this.router.navigate(['./cases/indiacases'], {
      queryParams: { state: JSON.stringify(state['state']) },
    });
    // location.reload();
    // console.log(this.vss.getStateNameForCases());
  }
  addSearch() {
    this.displayTextBox = true;
  }
  removeSearch() {
    this.displayTextBox = false;
  }
  ngOnInit(): void {
//updating date info

this.vss.updateDate().subscribe((data)=>{
  console.log(data['message']);
});

//------------------------------------------------

    console.log(this.router.url);
    // this.state = sessionStorage.getItem('state');
    // if (this.state) {
    //   this.router.navigate(['./cases/indiacases']);
    // }
    //calling underline function in app component so that the link is navbar is underlined when this component is opened
    // this.appObj.underline('cases');
    // this.b = true;
    // this.ar.queryParams.subscribe((params) => {
    //   if (params.data == undefined) {
    //     // if no state is entered
    //     this.country = true;
    //     this.ds.data1().subscribe((data) => {
    //       this.timeseriesdata = data['cases_time_series'];
    //       this.newConfirmed =
    //         this.timeseriesdata[this.timeseriesdata.length - 1][
    //           'dailyconfirmed'
    //         ];
    //       this.newDeceased =
    //         this.timeseriesdata[this.timeseriesdata.length - 1][
    //           'dailydeceased'
    //         ];
    //       this.newRecovered =
    //         this.timeseriesdata[this.timeseriesdata.length - 1][
    //           'dailyrecovered'
    //         ];
    //       // console.log(data['statewise'][0]);
    //       this.active = data['statewise'][0]['active'];
    //       this.total = data['statewise'][0]['confirmed'];
    //       this.deaths = data['statewise'][0]['deaths'];
    //       this.recovered = data['statewise'][0]['recovered'];
    //       this.arr = data['statewise'].slice(1, data['statewise'].length);
    //       this.i = 0;
    //       for (let val of this.arr) {
    //         //console.log(val);
    //         if (val['state'] == 'State Unassigned') {
    //           break;
    //         }
    //         this.i++;
    //       }
    //       console.log('State is', this.arr[this.i]['state']);
    //       this.arr.splice(this.i, 1);
    //     });
    //   } else {
    //     //if a state name is entered
    //     this.country = false;
    //     this.stateDetails = JSON.parse(params.data);
    //     this.stateFromUser = this.stateDetails.state;
    //     this.stateFromUser.toLowerCase();
    //     let i;
    //     this.ds.data1().subscribe(async (data) => {
    //       // console.log(data['statewise']);s
    //       // console.log(this.stateFromUser);
    //       for (i = 0; i < data['statewise'].length; i++) {
    //         this.stateFromApi = data['statewise'][i]['state'];
    //         this.stateFromApi.toLowerCase();
    //         if (this.stateFromApi == this.stateFromUser) {
    //           break;
    //         }
    //       }
    //       if (i == data['statewise'].length) {
    //         this.router.navigate(['./pagenotfound']);
    //       } else {
    //         this.stateName = this.stateFromApi;
    //         this.active = data['statewise'][i]['active'];
    //         this.total = data['statewise'][i]['confirmed'];
    //         this.deaths = data['statewise'][i]['deaths'];
    //         this.recovered = data['statewise'][i]['recovered'];
    //         this.b = true;
    //       }
    //     });
    //     this.ds.data2().subscribe((data) => {
    //       console.log('State from api ', this.stateFromApi);
    //       this.districtDetails = data[this.stateFromApi];
    //       // console.log(this.districtDetails);
    //       this.districtDet = this.districtDetails['districtData'];
    //       this.arr = [];
    //       for (let val in this.districtDet) {
    //         // console.log(this.districtDet[val]);
    //         if (
    //           val != 'Foreign Evacuees' &&
    //           val != 'Other State' &&
    //           val != 'Unknown' &&
    //           val != 'Airport Quarantine' &&
    //           val != 'Italians' &&
    //           val != 'CAPF Personnel' &&
    //           val != 'Other Region' &&
    //           val != 'Others' &&
    //           val != 'State Pool' &&
    //           val != 'Evacuees' &&
    //           val != 'Foreign Evacuees' &&
    //           val != 'Railway Quarantine'
    //         )
    //           this.arr.push({
    //             district: val,
    //             active: this.districtDet[val]['active'],
    //             total: this.districtDet[val]['confirmed'],
    //             deaths: this.districtDet[val]['deceased'],
    //             recovered: this.districtDet[val]['recovered'],
    //           });
    //       }
    //     });
    //   }
    //   console.log('New confirme ', this.newConfirmed);
    //   // function debounce(func, wait = 20, immediate = true) {
    //   //   var timeout;
    //   //   return function () {
    //   //     var context = this,
    //   //       args = arguments;
    //   //     var later = function () {
    //   //       timeout = null;
    //   //       if (!timeout) func.apply(context, args);
    //   //     };
    //   //     var callNow = immediate && !timeout;
    //   //     clearTimeout(timeout);
    //   //     timeout = setTimeout(later, wait);
    //   //     if (callNow) func.apply(context, args);
    //   //   };
    //   // }
    //   // const sliderCards = document.querySelector('.forCards');
    //   // function checkSlide(e) {
    //   //   const slideAt =
    //   //     window.scrollY + window.innerHeight - sliderCards.clientHeight / 2;
    //   //   const cardBottom = sliderCards.clientTop + sliderCards.clientHeight;
    //   //   const isHalfShown = slideAt > sliderCards.clientTop;
    //   //   const isNotScrolledPast = window.scrollY < cardBottom;
    //   //   if (isHalfShown && isNotScrolledPast) {
    //   //     sliderCards.classList.add('active');
    //   //   } else {
    //   //     sliderCards.classList.remove('active');
    //   //   }
    //   // }
    //   // window.addEventListener('scroll', debounce(checkSlide));
    // });
  }
}
