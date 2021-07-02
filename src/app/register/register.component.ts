import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import {
  faLock,
  faMobile,
  faEnvelope,
  faPhoneAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faLock = faLock;
  faMobile = faMobile;
  faEnvelope = faEnvelope;
  faPhoneAlt = faPhoneAlt;
  faUser = faUser;
  constructor(
    private ds: DataService,
    private router: Router,
    private appObj: AppComponent
  ) {}
  password: string;
  confirmpassword: string;
  ngOnInit(): void {
    this.appObj.underline('register');
  }
  getData(data) {
    console.log(data);
    this.ds.register(data).subscribe((data) => {
      if (data['message'] == 'Already exists') {
        alert('Mobile number is already registered');
      } else if (data['message'] == 'Register Success') {
        alert('Registration succesful');
        this.router.navigate(['/login']);
      }
    });
  }
}
