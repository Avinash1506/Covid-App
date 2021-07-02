import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})
export class AdminhomeComponent implements OnInit {
  faVirus = faVirus;
  constructor(private router: Router) {}
  val = false;
  ngOnInit(): void {}
  showLogout() {
    this.val = true;
  }
  adminlogout() {
    this.val = false;
    localStorage.clear();
    this.router.navigate(['./adminlogin']);
  }
}
