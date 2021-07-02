import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  constructor(private hc: HttpClient) {}
  adminLogin(data) {
    return this.hc.post('/admin/login', data);
  }
  sendData(data) {
    return this.hc.post('/admin/adddata', data);
  }
  getDataBasedOnCenterId(data) {
    return this.hc.post('/admin/getcenterdetails', data);
  }
  getStatename() {
    return this.hc.get('/admin/getstatename');
  }
  updateData(data) {
    return this.hc.put('/admin/updatedata', data);
  }
  deleteData(data) {
    return this.hc.delete(`/admin/deletedata/${data.center_id}`);
  }
}
