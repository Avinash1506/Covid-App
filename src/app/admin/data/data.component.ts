import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    let add = document.querySelector('#add-tab');
    let update = document.querySelector('#update-tab');
    let delete1 = document.querySelector('#delete-tab');
    console.log(this.router.url);
    if (this.router.url[6] == 'a') {
      add.classList.add('active');
      update.classList.remove('active');
      delete1.classList.remove('active');
    } else if (this.router.url[6] == 'd') {
      add.classList.remove('active');
      update.classList.remove('active');
      delete1.classList.add('active');
    } else {
      add.classList.remove('active');
      update.classList.add('active');
      delete1.classList.remove('active');
    }
  }
  navigate(data) {
    if (data == 'delete') {
      this.router.navigate(['./data/deletedata']);
    } else if (data == 'add') {
      this.router.navigate(['./data/adddata']);
    } else if (data == 'update') {
      this.router.navigate(['./data/updatedata']);
    }
  }
}
