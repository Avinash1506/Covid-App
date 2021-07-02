import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  invokeAppComponentFunction = new EventEmitter();
  // invokeMoreDetailsFunction = new EventEmitter();
  subsVar: Subscription;
  subsVar2: Subscription;
  stateName;
  constructor(private hc: HttpClient) {}
  isLoggedIn;
  userdata;
  //for invoking function in parent to reset state value
  private data = new BehaviorSubject('default data');
  data$ = this.data.asObservable();
  changeData(data: string) {
    this.data.next(data);
  }
  data1() {
    let url = 'https://api.covid19india.org/data.json';
    return this.hc.get(url);
  }
  data2() {
    let url = 'https://api.covid19india.org/state_district_wise.json';
    return this.hc.get(url);
  }

  register(data) {
    return this.hc.post('/user/register', data);
  }
  login(data) {
    console.log('Inside service');
    return this.hc.post('/user/login', data);
  }
  loginHandlingFunction() {
    this.invokeAppComponentFunction.emit();
  }
  setStateName(state) {
    //storing the state name in service
    this.stateName = state;
    //calling function setStateName in indiacasescomponent to set the state name
    // this.ic.setStateName(state);
  }
  statusOfLogin() {
    return this.isLoggedIn;
  }
  slotbooking() {
    return this.hc.get('/user/slotbooking');
  }
  //sends the co-ordinates of a country
  getStateShapes() {
    let url = 'assets/states_india.json';
    return this.hc.get(url);
  }
  getCountriesCoordinates() {
    //json.maxItemsComputed setting for increasing no of symbols
    let url = 'assets/countries.json';
    return this.hc.get(url);
  }
  getWorldcases() {
    return this.hc.get('/user/getworlddata');
  }
}
