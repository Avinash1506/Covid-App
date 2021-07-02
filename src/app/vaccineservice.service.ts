import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IndiacasesComponent } from './indiacases/indiacases.component';
import { getOutputFileNames } from 'typescript';
@Injectable({
  providedIn: 'root',
})
export class VaccineserviceService {
  invokeMoreDetailsFunction = new EventEmitter();
  constructor(private hc: HttpClient) {}
  stateName = '';
  district_no;
  center_no;
  slot;
  date;
  vaccine;
  state: string;
  district: string;
  hospital: string;
  setData(data) {
    this.district_no = data['district_no'];
    this.center_no = data['center_no'];
  }
  sendData() {
    return { district_no: this.district_no, center_no: this.center_no };
  }
  putSlot(val) {
    this.slot = val['slot'];
  }
  getSlot() {
    return this.slot;
  }
  putDate(date) {
    this.date = date;
  }
  getDate() {
    return this.date;
  }
  getData(pinno) {
    let today = new Date();
    let dd = today.getDate();
    let ddmain, mmmain;
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      ddmain = `0${dd}`;
    } else {
      ddmain = `${dd}`;
    }

    if (mm < 10) {
      mmmain = `0${mm}`;
    } else {
      mmmain = `${mm}`;
    }
    let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinno}&date=${ddmain}-${mmmain}-${yyyy}`;
    console.log(url);
    return this.hc.get(url);
  }
  getStates() {
    // let url = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
    return this.hc.get('/user/getstates');
  }
  getStatesAdmin() {
    return this.hc.get('/admin/getstates');
  }
  getDistrictAdmin(no) {
    return this.hc.post('/admin/getdistricts', { state_id: no });
  }
  getDistrict(no) {
    // let url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${no}`;
    //making post request to server
    return this.hc.post('/user/getdistricts', { state_id: no });
  }
  sendingDataFromSlotBooking(data) {
    console.log('data is ', data);
    return this.invokeMoreDetailsFunction.emit(data);
  }
  getDataByDistrictAndStateIdId(district_no, state_no) {
    //using API
    // let today = new Date();
    // let dd = today.getDate();
    // let ddmain, mmmain;
    // let mm = today.getMonth() + 1;
    // const yyyy = today.getFullYear();
    // if (dd < 10) {
    //   ddmain = `0${dd}`;
    // } else {
    //   ddmain = `${dd}`;
    // }

    // if (mm < 10) {
    //   mmmain = `0${mm}`;
    // } else {
    //   mmmain = `${mm}`;
    // }
    // // let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${no}&date=${ddmain}-${mmmain}-${yyyy}`;
    // let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${no}&date=${ddmain}-${mmmain}-${yyyy}`;
    // return this.hc.get(url);

    //Using DB
    return this.hc.post('/user/getDataOfCenters', {
      district_id: district_no,
      state_id: state_no,
    });
  }
  getOtp(mobileno) {
    return this.hc.post(
      'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',
      mobileno
    );
  }
  validateOtp(otp, txnid) {
    let obj = { otp: otp, txnId: txnid };
    return this.hc.post(
      'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
      obj
    );
  }
  checkvaccinedetails(details) {
    return this.hc.post('/user/checkvaccinedetails', details);
  }
  putVaccine(vaccine) {
    this.vaccine = vaccine;
  }
  getVaccine() {
    return this.vaccine;
  }
  getVaccineDetails(username) {
    console.log('Username inside gvaccine service is ', username);
    return this.hc.post('user/vaccinedetails', { username: username });
  }
  putStateName(state) {
    this.state = state;
  }
  putDistrictName(district) {
    this.district = district;
  }
  putHospitalName(hospital) {
    this.hospital = hospital;
  }
  getDistrictName() {
    return this.district;
  }
  getStateName() {
    return this.state;
  }
  getHospitalName() {
    return this.hospital;
  }
  getUsername(data) {
    return this.hc.post('user/getusername', data);
  }
  setStateName(state) {
    //storing the state name in service
    console.log('State in set statename fumction is ', state);
    this.stateName = state;
    //calling function setStateName in indiacasescomponent to set the state name
    // this.ic.setStateName(state);
  }
  getStateNameForCases() {
    console.log('State in service ', this.stateName);
    return this.stateName;
  }
  getUserDetails(username) {
    console.log('Username in vaccine service is ', username);
    return this.hc.post('/user/getdata', { username: username });
  }
  uservaccinedatainsert(data) {
    return this.hc.post('/user/uservaccinedatainsert', data);
  }
  //sends users names and their first and second dose details
  getUserVaccineData(username) {
    return this.hc.post('/user/userVaccineData', { username: username });
  }
  updateDate() {
    return this.hc.get('/user/updateDate');
  }
  //sends the details of center
}
