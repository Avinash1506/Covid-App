import { Component, OnInit } from '@angular/core';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AdminserviceService } from '../adminservice.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  constructor(
    private ads: AdminserviceService,
    private router: Router,
    private appObj: AppComponent
  ) {}

  ngOnInit(): void {}
  verifyData(admindata) {
    console.log(admindata);
    this.ads.adminLogin(admindata).subscribe((data) => {
      if (data['message'] == 'Successful') {
        localStorage.setItem('admintoken', data['jwt']);
        let username = JSON.stringify(data['userdata']);
        localStorage.setItem('username', username);
        this.appObj.showLogout();
        this.router.navigate(['./data/adddata']);
      } else {
        if (data['message'] == "didn't match") {
          alert("Passwords didn't match");
        } else if (data['message'] == "doesn't exist") {
          alert("Admin doesn't exist");
        }
      }
    });
  }
}
