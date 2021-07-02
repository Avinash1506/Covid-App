import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faVirus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  faVirus = faVirus;
  faSearch = faSearch;
  title = 'CovidApp';
  statename = '';
  userdata;
  val1;
  val2;
  toShow = true;
  cases;
  vaccine;
  login;
  register;
  stats;
  maps;
  slot;
  dashboard;
  obj = {};
  aLink;
  // self = this;
  val; //true if logged in and false if logged out
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ds: DataService
  ) {
    console.log('Hello inside app component');
    if (localStorage.getItem('token')) {
      this.val = true;
    } else {
      this.val = false;
    }
    if (localStorage.getItem('admintoken')) {
      this.val2 = true;
    } else {
      this.val2 = false;
    }
  }
  // stateName(state) {
  //   // console.log(this.router.url);
  //   this.statename = state;
  //   console.log('state is ', this.statename);
  //   let s = this.router.url;
  //   s = s.slice(0, 7);
  //   console.log(s);
  //   if (s == '/graphs') {
  //     this.router.navigate(['./graphs'], {
  //       queryParams: { data: JSON.stringify(state) },
  //     });
  //   } else {
  //     this.router.navigate(['./cases'], {
  //       queryParams: { data: JSON.stringify(state) },
  //     });
  //   }
  // }
  // clearState() {
  //   this.statename = '';
  //   //console.log('Hello thisusydret');
  // }
  // clearState2(data) {
  //   this.statename = '';
  //   console.log('Hello thisusydret');
  // }
  logout() {
    localStorage.clear();
    this.val = false;
    console.log('Inside logout');
    this.router.navigate(['./']);
    this.toShow = true;
  }
  showLogout() {
    this.val2 = true;
  }
  adminlogout() {
    this.val2 = false;
    localStorage.clear();
    this.router.navigate(['./cases']);
  }
  navigation1() {
    // if (this.statename !== '') {
    //   this.router.navigate(['./cases'], {
    //     queryParams: { data: JSON.stringify(this.statename) },
    //   });
    // } else {
    //   this.router.navigate(['./cases']);
    // }
    this.toShow = true;
    // for (let val in this.obj) {
    //   this.aLink = this.obj[val];
    //   if (this.aLink) this.aLink.classList.remove('underline');
    // }
    // this.aLink = this.obj['cases'];
    // this.aLink.classList.add('underline');
  }
  navigation2() {
    // console.log('In Navigation-2');
    // if (this.statename !== '') {
    //   this.router.navigate(['./graphs'], {
    //     queryParams: { data: JSON.stringify(this.statename) },
    //   });
    // } else {
    //   this.router.navigate(['./graphs']);
    // }
    this.toShow = true;
    // for (let val in this.obj) {
    //   this.aLink = this.obj[val];
    //   if (this.aLink) this.aLink.classList.remove('underline');
    // }
    // this.aLink = this.obj['stats'];
    // this.aLink.classList.add('underline');
  }
  addSearchBar() {
    this.toShow = true;
  }
  removeSearchBar() {
    this.toShow = false;
  }
  underline(link) {
    this.cases = document.querySelector('.cases');
    this.vaccine = document.querySelector('.vaccine');
    this.stats = document.querySelector('.stats');
    this.maps = document.querySelector('.maps');
    this.slot = document.querySelector('.slot');
    this.register = document.querySelector('.register');
    this.login = document.querySelector('.login');
    this.dashboard = document.querySelector('.dashboard');
    console.log(this.dashboard);
    this.obj = {
      cases: this.cases,
      vaccine: this.vaccine,
      stats: this.stats,
      maps: this.maps,
      slot: this.slot,
      register: this.register,
      login: this.login,
      dashboard: this.dashboard,
    };
    console.log(this.obj);
    console.log('Inside underline');
    for (let val in this.obj) {
      this.aLink = this.obj[val];
      if (this.aLink) this.aLink.classList.remove('underline');
    }
    if (link === 'vaccine') {
      this.aLink = <HTMLElement>this.obj['vaccine'];
      console.log(this.aLink);
      this.aLink.classList.add('underline');
    } else if (link === 'cases') {
      this.aLink = this.obj['cases'];
      this.aLink.classList.add('underline');
    } else if (link === 'stats') {
      this.aLink = this.obj['stats'];
      this.aLink.classList.add('underline');
    } else if (link === 'maps') {
      this.aLink = this.obj['maps'];
      this.aLink.classList.add('underline');
    } else if (link === 'slot') {
      this.aLink = this.obj['slot'];
      this.aLink.classList.add('underline');
    } else if (link === 'register') {
      this.aLink = this.obj['register'];
      this.aLink.classList.add('underline');
    } else if (link === 'login') {
      this.aLink = this.obj['login'];
      this.aLink.classList.add('underline');
    } else if (link === 'dashboard') {
      this.aLink = this.obj['dashboard'];
      this.aLink.classList.add('underline');
    }
  }
  showLogoutAndDashboard() {
    this.val = true;
  }
  ngOnInit() {
    console.log('Hello');
    this.ds.data$.subscribe((res) => {
      this.statename = '';
    });
    // if (this.ds.subsVar == undefined) {
    //   this.ds.subsVar = this.ds.invokeAppComponentFunction.subscribe(
    //     (name: string) => {
    //       this.val = true; //true because user is logged in
    //       this.toShow = true; // true because seach bar should be present
    //     }
    //   );
    // }
    console.log(window.location.href);
    console.log(document.querySelector('.navbar'));
  }
}
