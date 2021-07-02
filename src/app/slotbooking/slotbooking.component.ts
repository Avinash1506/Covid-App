import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { VaccineserviceService } from '../vaccineservice.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-slotbooking',
  templateUrl: './slotbooking.component.html',
  styleUrls: ['./slotbooking.component.css'],
})
export class SlotbookingComponent implements OnInit {
  @Output() parentFunction = new EventEmitter();
  constructor(
    private ds: DataService,
    private vss: VaccineserviceService,
    private router: Router,
    private appObj: AppComponent
  ) {}
  ngOnInit(): void {
    console.log('Hello');
    this.appObj.underline('slot');
  }

  activate(data) {
    //activates the tab
    let district = document.querySelector('#district-tab');
    let pincode = document.querySelector('#pincode-tab');
    console.log(this.router.url);
    if (data == 'district') {
      district.classList.add('active');
      pincode.classList.remove('active');
    } else if (data == 'pincode') {
      district.classList.remove('active');
      pincode.classList.add('active');
    }
  }

  // getData(pin) {
  //   this.vss.getData(pin).subscribe((data) => {
  //     console.log(data);
  //   });
  // }
  navigateToLogin() {
    this.router.navigate(['./login']);
  }
  navigateToAddUser() {
    this.router.navigate(['./slotbooking']);
  }
  navigate(data) {
    if (data == 'district') {
      this.router.navigate(['./selectcenter/bydistrict']);
    } else {
      this.router.navigate(['./selectcenter/bypincode']);
    }
  }
}
