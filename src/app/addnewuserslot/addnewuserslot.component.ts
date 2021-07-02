import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { VaccineserviceService } from '../vaccineservice.service';
import { Router } from '@angular/router';
import { faPhoneAlt, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-addnewuserslot',
  templateUrl: './addnewuserslot.component.html',
  styleUrls: ['./addnewuserslot.component.css'],
})
export class AddnewuserslotComponent implements OnInit {
  faPlus = faPlus;
  faPhoneAlt = faPhoneAlt;
  faUser = faUser;
  constructor(
    private appObj: AppComponent,
    private vss: VaccineserviceService,
    private router: Router
  ) {}
  usersArray;
  username;
  userDetails;
  ngOnInit(): void {
    if (sessionStorage.getItem('usernameForSlotbooking')) {
      sessionStorage.removeItem('usernameForSlotbooking');
    }
    this.appObj.underline('slot');
    this.username = JSON.parse(localStorage.getItem('Userdata'));
    console.log(this.username);
    this.vss.getUserVaccineData(this.username).subscribe((data) => {
      if (
        data['message'] == 'Session Expired' ||
        data['message'] == 'Unauthorized access'
      ) {
        let val = <HTMLElement>document.querySelector('#bt');
        val.click();
        console.log(val);
      } else {
        if (data['message'] == null) {
          let btn = <HTMLElement>document.querySelector('#useradditionbtn');
          btn.click();
        } else {
          this.userDetails = data['message']['users'];
        }
      }
      console.log(data['message']);
      this.usersArray = data['message'];
    });
  }
  navigateToLogin() {
    this.router.navigate(['./login']);
  }
  navigateToSlotDetails() {
    this.router.navigate(['./selectcenter']);
  }
  submitData(data) {
    console.log(data);
  }
  slotbooking(data) {
    let dataToBeSent = { no: data, username: this.username };
    this.vss.getUsername(dataToBeSent).subscribe((dataFromDb) => {
      console.log(dataFromDb['username']);
      sessionStorage.setItem('usernameForSlotbooking', dataFromDb['username']);
      this.router.navigate(['./selectcenter']);
    });
  }
  adddata() {
    console.log('Hello');
    let firstname_input = <HTMLInputElement>(
      document.querySelector('#firstname')
    );
    let firstname = firstname_input.value;
    let lastname_input = <HTMLInputElement>document.querySelector('#lastname');
    let lastname = lastname_input.value;
    let age_input = <HTMLInputElement>document.querySelector('#age');
    let age = age_input.value;
    let username_input = <HTMLInputElement>document.querySelector('#username');
    let username = username_input.value;

    let userObj = {
      firstname: firstname,
      lastname: lastname,
      age: age,
      username: username,
      main_username: this.username,
    };
    this.vss.uservaccinedatainsert(userObj).subscribe((data) => {
      this.vss.getUserVaccineData(this.username).subscribe((data) => {
        if (
          data['message'] == 'Session Expired' ||
          data['message'] == 'Unauthorized access'
        ) {
          let val = <HTMLElement>document.querySelector('#bt');
          val.click();
          console.log(val);
        } else {
          if (data['message'] == null) {
            let btn = <HTMLElement>document.querySelector('#useradditionbtn');
            btn.click();
          } else {
            this.userDetails = data['message']['users'];
          }
        }
        console.log(data['message']);
        this.usersArray = data['message'];
      });
    });
  }
}
