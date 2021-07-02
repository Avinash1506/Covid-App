import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import {
  faLock,
  faMobile,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  faMobile = faMobile;
  faPhoneAlt = faPhoneAlt;
  constructor(
    private ds: DataService,
    private router: Router,
    private appObj: AppComponent
  ) {}

  ngOnInit(): void {
    this.appObj.underline('login');
  }
  verifyData(data) {
    console.log('Hellooooooo');
    console.log('User details in login.ts ', data);
    this.ds.login(data).subscribe((data) => {
      if (data['message'] == 'Invalid') {
        alert('User is not registered');
      } else if (data['message'] == 'Incorrect password') {
        alert('Password is incorrect');
      } else if (data['message'] == 'Successful') {
        localStorage.setItem('token', data['jwt']);
        let userObj = JSON.stringify(data['userdata']);
        localStorage.setItem('Userdata', userObj);
        this.appObj.showLogoutAndDashboard();
        // this.ds.loginHandlingFunction();
        this.router.navigate(['./']);
      }
    });
  }
}
