import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { VaccineserviceService } from '../vaccineservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { CasesComponent } from '../cases/cases.component';
import { faGreaterThan, faSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-indiacases',
  templateUrl: './indiacases.component.html',
  styleUrls: ['./indiacases.component.css'],
})
export class IndiacasesComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faSlash = faSlash;
  @Output() parentFunction = new EventEmitter();
  active;
  total;
  deaths;
  recovered;
  stateFromUser;
  stateFromApi;
  stateDetails;
  flag = false;
  districtDetails;
  country;
  districtDet;
  timeseriesdata = [];
  arr = [];
  newConfirmed;
  newDeceased;
  newRecovered;
  i;
  s;
  state = 'no state';
  stateName = '';
  b: boolean = true;
  constructor(
    private ds: DataService,
    private router: Router,
    private ar: ActivatedRoute,
    private appObj: AppComponent,
    private vss: VaccineserviceService,
    private casesObj: CasesComponent
  ) {}
  stateOrCountry;
  async takeToHome() {
    this.b = true;
    this.parentFunction.emit('Hello');
    console.log('Hello all');
    this.router.navigate(['./cases']);
  }
  //  googleTranslateElementInit() {
  //     new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  // }
  clearState() {
    if (sessionStorage.getItem('state')) {
      sessionStorage.removeItem('state');
    }
    this.state = 'no state';
    this.router.navigate(['./cases/indiacases']);
  }
  ngOnInit(): void {
    if (localStorage.getItem('admintoken')) {
      this.router.navigate(['./data/adddata']);
    }
    this.casesObj.addSearch();
    this.casesObj.addUnderline('india');
    console.log('Url is ', this.router.url);
    this.s = this.router.url;
    console.log('length ', this.s.length);
    if (this.s.length == 17) {
      console.log('Walter');
      if (sessionStorage.getItem('state')) {
        sessionStorage.removeItem('state');
      }
    }
    this.b = true;
    this.appObj.underline('cases');
    // this.ar.queryParams.subscribe((params) => {
    // console.log('params in india cases is ', params);
    // this.stateName = this.vss.getStateNameForCases();
    // console.log('State name is ', this.stateName);
    this.ar.queryParams.subscribe((params) => {
      console.log(params.state);
      if (params.state !== undefined) {
        // }
        //----------------------------------------------------------------
        //if a state name is entered
        console.log('Inside if block');
        console.log('Hello in india cases');
        this.country = false;
        this.stateDetails = JSON.parse(params.state);
        this.stateFromUser = sessionStorage.getItem('state');
        if (this.stateDetails !== this.stateFromUser) {
          //redirect to page not found
        }
        this.state = this.stateFromUser;
        console.log('state from user ', this.stateFromUser);
        // this.stateFromUser.toLowerCase();
        let i;
        this.ds.data1().subscribe(async (data) => {
          // console.log(data['statewise']);s
          // console.log(this.stateFromUser);
          for (i = 0; i < data['statewise'].length; i++) {
            this.stateFromApi = data['statewise'][i]['state'];
            // this.stateFromApi.toLowerCase();
            if (this.stateFromApi == this.stateFromUser) {
              break;
            }
          }
          if (i == data['statewise'].length) {
            this.router.navigate(['./pagenotfound']);
          } else {
            this.stateName = this.stateFromApi;
            this.active = data['statewise'][i]['active'];
            this.total = data['statewise'][i]['confirmed'];
            this.deaths = data['statewise'][i]['deaths'];
            this.recovered = data['statewise'][i]['recovered'];
            this.b = true;
          }
        });
        this.ds.data2().subscribe((data) => {
          console.log('State from api ', this.stateFromUser);
          console.log('Country ', this.country);
          this.districtDetails = data[this.stateFromUser];
          // console.log(this.districtDetails);
          this.districtDet = this.districtDetails['districtData'];
          this.arr = [];
          for (let val in this.districtDet) {
            // console.log(this.districtDet[val]);
            if (
              val != 'Foreign Evacuees' &&
              val != 'Other State' &&
              val != 'Unknown' &&
              val != 'Airport Quarantine' &&
              val != 'Italians' &&
              val != 'CAPF Personnel' &&
              val != 'Other Region' &&
              val != 'Others' &&
              val != 'State Pool' &&
              val != 'Evacuees' &&
              val != 'Foreign Evacuees' &&
              val != 'Railway Quarantine'
            )
              this.arr.push({
                district: val,
                active: this.districtDet[val]['active'],
                total: this.districtDet[val]['confirmed'],
                deaths: this.districtDet[val]['deceased'],
                recovered: this.districtDet[val]['recovered'],
              });
          }
        });
      } else {
        // if (this.stateName == '') {
        // if no state is entered
        this.state = 'no state';
        this.country = true;
        console.log('inside else block');
        this.ds.data1().subscribe((data) => {
          this.timeseriesdata = data['cases_time_series'];
          this.newConfirmed =
            this.timeseriesdata[this.timeseriesdata.length - 1][
              'dailyconfirmed'
            ];
          this.newDeceased =
            this.timeseriesdata[this.timeseriesdata.length - 1][
              'dailydeceased'
            ];
          this.newRecovered =
            this.timeseriesdata[this.timeseriesdata.length - 1][
              'dailyrecovered'
            ];
          // console.log(data['statewise'][0]);
          this.active = data['statewise'][0]['active'];
          this.total = data['statewise'][0]['confirmed'];
          this.deaths = data['statewise'][0]['deaths'];
          this.recovered = data['statewise'][0]['recovered'];
          this.arr = data['statewise'].slice(1, data['statewise'].length);
          this.i = 0;
          for (let val of this.arr) {
            //console.log(val);
            if (val['state'] == 'State Unassigned') {
              break;
            }
            this.i++;
          }
          console.log('State is', this.arr[this.i]['state']);
          this.arr.splice(this.i, 1);
        });
      }
    });

    console.log('New confirme ', this.newConfirmed);
    // function debounce(func, wait = 20, immediate = true) {
    //   var timeout;
    //   return function () {
    //     var context = this,
    //       args = arguments;
    //     var later = function () {
    //       timeout = null;
    //       if (!timeout) func.apply(context, args);
    //     };
    //     var callNow = immediate && !timeout;
    //     clearTimeout(timeout);
    //     timeout = setTimeout(later, wait);
    //     if (callNow) func.apply(context, args);
    //   };
    // }
    // const sliderCards = document.querySelector('.forCards');
    // function checkSlide(e) {
    //   const slideAt =
    //     window.scrollY + window.innerHeight - sliderCards.clientHeight / 2;
    //   const cardBottom = sliderCards.clientTop + sliderCards.clientHeight;
    //   const isHalfShown = slideAt > sliderCards.clientTop;
    //   const isNotScrolledPast = window.scrollY < cardBottom;
    //   if (isHalfShown && isNotScrolledPast) {
    //     sliderCards.classList.add('active');
    //   } else {
    //     sliderCards.classList.remove('active');
    //   }
    // }
    // window.addEventListener('scroll', debounce(checkSlide));
    // });
  }
  init() {}
}
